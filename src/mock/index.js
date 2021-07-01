import Mock from 'mockjs'
import { data as admin } from './mockData/admin.js'
import res from './mockData/response.js'

// 后端登录验证
Mock.mock('/backlogin', 'post', (options) => {
  const body = JSON.parse(options.body)
  const user = admin.find(e =>
    e.username === body.username && e.password === body.password)
  if (user) return res.LOGINSUCCESS
  else return res.LOGINFAIL
})

// Mock.mock('/getUserList', 'post', (options) => {
//   let userlist = JSON.parse(sessionStorage.getItem('userlist'))

//   console.log(data.list)
//   if (userlist == null) {
//     userlist = data.list
//     sessionStorage.setItem('userlist', JSON.stringify(userlist))
//   }

//   return userlist
// })
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
