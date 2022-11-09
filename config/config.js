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
    secretKey: "secretKey",
    // 过期时间 1小时
    expiresIn: 60 * 60
  }
}
