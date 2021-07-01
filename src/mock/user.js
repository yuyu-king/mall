"use strict"
const data = Mock.mock({
  'list|100': [{
    id: Mock.Random.guid(),
    username: Mock.Random.string('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 3, 10),
    password: Mock.Random.string('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]', 6, 16),
    nickname: Mock.Random.string('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 3, 16),
    name: Mock.Random.cname(),
    address: Mock.Random.county(true)
  }]
})
