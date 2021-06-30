import Mock from 'mockjs'
import UserData from './user.json'
import UserList from './userList.json'

Mock.mock('/login', 'post', (options) => {
  const user = JSON.parse(options.body)
  if (user.username === UserData.result.username && user.password === UserData.result.password) {
    return {
      code: 200,
      result: {
        apikey: 'b9b3a96f7554e3bead2eccf16506c13e'
      }
    }
  } else {
    return {
      code: 404,
      result: {}
    }
  }
})

Mock.mock('/getUserList', 'post', (options) => {
  let userlist = JSON.parse(sessionStorage.getItem('userlist'))
  if (userlist == null) {
    userlist = UserList.result
    sessionStorage.setItem('userlist', JSON.stringify(userlist))
  }
  return userlist
})
Mock.mock('/deleteUserById', 'post', (options) => {
  const id = JSON.parse(options.body).id
  let userlist = JSON.parse(sessionStorage.getItem('userlist'))
  userlist = userlist.filter((value, index, array) => {
    return value.id !== id
  })
  sessionStorage.setItem('userlist', JSON.stringify(userlist))
  return userlist
})
Mock.mock('/addUser', 'post', (options) => {
  const body = JSON.parse(options.body)
  const userlist = JSON.parse(sessionStorage.getItem('userlist'))
  const id = userlist[userlist.length - 1].id + 1
  const user = {
    id,
    username: body.username,
    address: body.address
  }
  userlist.push(user)
  sessionStorage.setItem('userlist', JSON.stringify(userlist))
  return userlist
})
Mock.mock('/editUserById', 'post', (options) => {
  const body = JSON.parse(options.body)
  const userlist = JSON.parse(sessionStorage.getItem('userlist'))
  userlist.forEach(value => {
    if (value.id === body.id) {
      value.username = body.username
      value.address = body.address
    }
  })
  sessionStorage.setItem('userlist', JSON.stringify(userlist))
  return userlist
})
