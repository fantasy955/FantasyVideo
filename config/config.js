module.exports = {
  environment: 'dev',
  database: {
    dbName: 'fantasyvideo',
    host: '43.139.126.249',
    port: 3306,
    user: 'root',
    password: '9494itsyou'
  },
  security: {
    secretKey: "fd03f48b8aafdc949e0ed679e2fffe8db6ffe2a54ba3b3ce4eaa2a612c4a9d90ffa460b162fa30dea4a775303bd0b817",
    // 过期时间 小时
    expiresIn: 86400,
    expiresInRfresh: 2592000,
  }
}
