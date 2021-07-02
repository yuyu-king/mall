const backLogin = function(id) {
  const data = {
    code: 200,
    result: {
      token: '',
      id: ''
    }
  }
  data.result.token = 'token' + id
  data.result.id = id
  return data
}
const LOGINFAIL = {
  code: 404,
  result: {}
}
export default {
  backLogin,
  LOGINFAIL
}
