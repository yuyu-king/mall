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
  res.result = res.result.filter(data => !body.search || data.username.toLowerCase().includes(body.search.toLowerCase()))
  res.total = res.result.length
  res.result = res.result.slice(offset, offset + body.pagesize)
  return res
})
// Mock.mock('/deleteUserById', 'post', (options) => {
//   const id = JSON.parse(options.body).id
//   let userlist = JSON.parse(sessionStorage.getItem('userlist'))
//   userlist = userlist.filter((value, index, array) => {
//     return value.id !== id
//   })
//   sessionStorage.setItem('userlist', JSON.stringify(userlist))
//   return userlist
// })
// Mock.mock('/addUser', 'post', (options) => {
//   const body = JSON.parse(options.body)
//   const userlist = JSON.parse(sessionStorage.getItem('userlist'))
//   const id = userlist[userlist.length - 1].id + 1
//   const user = {
//     id,
//     username: body.username,
//     address: body.address
//   }
//   userlist.push(user)
//   sessionStorage.setItem('userlist', JSON.stringify(userlist))
//   return userlist
// })
// Mock.mock('/editUserById', 'post', (options) => {
//   const body = JSON.parse(options.body)
//   const userlist = JSON.parse(sessionStorage.getItem('userlist'))
//   userlist.forEach(value => {
//     if (value.id === body.id) {
//       value.username = body.username
//       value.address = body.address
//     }
//   })
//   sessionStorage.setItem('userlist', JSON.stringify(userlist))
//   return userlist
// })
