const Router = require('koa-router')

const router = new Router({
    prefix: '/api/user'
})

router.post('/signin', async (ctx) => {

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