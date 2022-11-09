const Router = require('koa-router')

const router = new Router({
    prefix: '/api/video'
})

router.get('/test', async (ctx)=>{
    ctx.response.status = 200;
    const data = {
        code: 1,
        msg: 'hello world'
    }
    ctx.body = data;
})


module.exports = router
