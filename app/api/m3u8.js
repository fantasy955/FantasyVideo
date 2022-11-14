const Router = require('koa-router')
const m3u8 = require('../controller/m3u8')

const router = new Router({
    prefix: '/m3u8'
})

router.get('/download', async (ctx) => {
    const target = ctx.query.path
    const { title, filename } = ctx.query
    if (target.endsWith('.m3u8')) {
        try {
            await m3u8.downloadMedia({
                url: target,
                output: `${process.cwd()}/public/storage/m3u8/${title}`,
                filename: filename,
            })
            ctx.body = {
                code: 1,
                msg: '添加下载任务',
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error.message,
            }
        }

    } else {
        ctx.body = {
            code: 0,
            msg: '目标路径错误'
        }
    }
})

module.exports = router