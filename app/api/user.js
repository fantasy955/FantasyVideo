const Router = require('koa-router')
const { generateToken, generateRefreshToken } = require('../../core/util')
const { Auth } = require('@middlewares/auth');

const router = new Router({
    prefix: '/api/user'
})


router.post('/signin', async (ctx) => {
    const { keeptime, id } = ctx.request.body
    const req_token = ctx.get('fv-user-token') ? ctx.get('fv-user-token') : null

    const req_refresh_token = ctx.get('fv-user-refresh-token') ? ctx.get('fv-user-refresh-token') : null

    const token = generateToken(id, Auth.USER)
    const refreshToken = keeptime ? generateRefreshToken(id, Auth.USER) : null

    ctx.body = {
        code: 1,
        data: {
            id: 1,
            username: 'fantasy955',
            nickname: 'fantasy955',
            email: '1642063542@qq.com',
            mobile: '18569380076',
            gender: 1,
            birthday: '1998-10-24',
            money: 0,
            score: 0,
            avatar: 'http://43.139.126.249:5000/storage/user/defalut_avatar.jpg',
            lastlogintime: '',
            lastloginip: '',
            jointime: '',
            motto: '',
            token: token,
            refreshToken: refreshToken,
        }
    }
})

router.post('/logout', async (ctx) => {
    const { refreshToken } = ctx.request.body
    console.log('退出登录', refreshToken)
    ctx.body = {
        code: 1,
        msg: '退出登录成功',
    }

})

const userData = {
    id: 123,
    username: 'fantasy955',
    nickname: 'fantasy955',
    email: '1642063542@qq.com',
    mobile: '18569380076',
    gender: 1,
    birthday: '1998-10-24',
    money: 9999,
    score: 9999,
    avatar: '',
    lastlogintime: '2023-10-23',
    lastloginip: '2022-10-23',
    jointime: '2022-10-23',
    motto: '',
    token: 'a940239c-4fb8-49be-b719-97442393e662',
    refreshToken: '',
}

module.exports = router