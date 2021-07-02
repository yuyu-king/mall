import Mock from 'mockjs'
const userList = Mock.mock({
  code: 200,
  message: '成功!',
  'result|100': [{
    id: Mock.Random.guid(),
    username: Mock.Random.string('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 3, 10),
    password: Mock.Random.string('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]', 6, 16),
    nickname: Mock.Random.string('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 3, 16),
    name: Mock.Random.cname(),
    address: Mock.Random.county(true),
    state: Mock.Random.bool(1, 49, false)
  }]
})
const adminList = [{
  id: 1,
  username: 'yuyu',
  password: '123456'
}]
const LoginSuccess = {
  code: 200,
  result: {}
}
const LoginFail = {
  code: 404,
  result: {}
}
export default {
  adminList,
  userList,
  LoginSuccess,
  LoginFail
}
