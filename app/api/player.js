
const Router = require('koa-router')
const fs = require('fs')
const { Http2ServerResponse } = require('http2')

const router = new Router({
    prefix: '/api/player'
})

router.get('/index', (ctx) => {
    ctx.body = {
        code: 1,
        data: {
            resources: [
                {
                    sourceName: '腾讯播放源',
                    sourceId: 0,
                    episodes: Array.from({ length: 32 }).map((i, v) => {
                        return { id: v, name: `第${v}集` }
                    }),
                }, {
                    sourceName: '无尽资源',
                    sourceId: 1,
                    episodes: [
                        { id: 0, name: '第1集' }, { id: 1, name: '第二集' }, { id: 2, name: '第三集' }, { id: 3, name: '第四集' },
                    ],
                }, {
                    sourceName: '红牛资源',
                    sourceId: 2,
                    episodes: [],
                }, {
                    sourceName: '天空资源',
                    sourceId: 3,
                    episodes: [],
                }, {
                    sourceName: '闪刀资源',
                    sourceId: 4,
                    episodes: [],
                },
            ]
        }
    }
})

router.get('/vod/:id', (ctx) => {
    console.log(ctx.params.id)
    ctx.type = 'text/html'
    let html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.2.5/hls.min.js"></script>
    </head>
    
    <body>
    
        <div class="container" style="width: 96%; margin: 30px auto">
            <video id="video" controls loop="false" width="100%"></video>
        </div>
    
        <script>
            var video = document.getElementById('video');
            if (Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource('http://localhost:5000/vod/demo/index.m3u8');
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    video.play();
                });
            } 
        </script>
    </body>
    
    </html>`
    ctx.body = html
})


module.exports = router