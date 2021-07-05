import Mock from 'mockjs'
import data from './data.js'

// 后端登录验证
Mock.mock('/backlogin', 'post', (options) => {
  const body = JSON.parse(options.body)
  const res = data.adminList
  const user = res.result.find(e =>
    e.username === body.username && e.password === body.password)
  if (user) {
    sessionStorage.setItem('adminName', user.username)
    return res
  } else return data.LoginFail
})

Mock.mock('/getUserList', 'post', (options) => {
  const body = JSON.parse(options.body)
  let res = JSON.parse(sessionStorage.getItem('userlist'))
  if (res == null) {
    res = data.userList
    sessionStorage.setItem('userlist', JSON.stringify(res))
  }
  const offset = (body.currentpage - 1) * body.pagesize
  const state = body.state === 'true'
  res.result = res.result.filter(data =>
    (!body.username || data.username.toLowerCase().includes(body.username.toLowerCase())) &&
    (!body.name || data.name.toLowerCase().includes(body.name.toLowerCase())) &&
    (!body.address || data.address.toLowerCase().includes(body.address.toLowerCase())) &&
    (!body.state || data.state === state))
  res.total = res.result.length
  res.result = res.result.slice(offset, offset + body.pagesize)
  return res
})
Mock.mock('/changeUserState', 'post', (options) => {
  const body = JSON.parse(options.body)
  const id = body.id
  const state = body.state
  const userlist = JSON.parse(sessionStorage.getItem('userlist'))
  userlist.result.find(user => user.id === id).state = state
  userlist.code = 200
  sessionStorage.setItem('userlist', JSON.stringify(userlist))
  return userlist
})
