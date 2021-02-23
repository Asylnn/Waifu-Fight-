const {OSU_API_URL} = require('../files/config.json')
const axios = require('axios')
const {ipAddr} = require('../levelExtention.js')
const {getHeaders} = require('./getHeaders.js')


const deleteTokens = socket => { //This doesn't work for watever reason
  axios.delete(OSU_API_URL + "oauth/tokens/current", {headers:getHeaders(global.selfTokens.access_token)}).then(axiosRes => {
    ipAddr.put(socket.clientIp, -1)
  }).catch(error => {
    socket.emit("error", {errorNumber:4})
    console.error(error)
  })
}

exports.deleteTokens = deleteTokens
