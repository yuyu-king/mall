import Mock from 'mockjs'
import UserData from './user.json'
import UserList from './userList.json'

Mock.mock('/login', 'post', (options) => {
  const user = JSON.parse(options.body)
  console.log(user)
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
  console.log(UserList.result)
  return UserList.result
})
