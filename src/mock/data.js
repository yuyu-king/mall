import Mock from 'mockjs'
const userList = Mock.mock({
  code: 200,
  message: '成功!',
  'result|100': [{
    'id|+1': 1000,
    username: '@string("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 3, 10)',
    password: '@string(6, 16)',
    nickname: '@string("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 3, 10)',
    name: '@cname',
    address: '@county(true)',
    state: '@boolean(1, 49, false)'
  }]
})
const adminList = {
  code: 200,
  message: '成功',
  result: [{
    id: 1,
    username: 'yuyu',
    password: '123456'
  }]
}
const LoginFail = {
  code: 404,
  result: {}
}
export default {
  adminList,
  userList,
  LoginFail
}
