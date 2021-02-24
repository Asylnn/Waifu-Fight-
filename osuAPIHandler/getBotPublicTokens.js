const axios = require('axios')
const {ipAddr, users} = require('../levelExtention.js')
const fs = require('fs')
const {user} = require('../classes/user.js')
const {OSU_API_URL,OSU_CLIENT_ID, OSU_SECRET} = require('../files/config.json')
const {getHeaders} = require('./getHeaders.js')

const getBotPublicTokens = req => {
  let requestInfo = { //Necessary Info to get tokens
    client_id:OSU_CLIENT_ID,
    client_secret:OSU_SECRET,
    code:req.query.code,
    grant_type:"authorization_code",
    redirect_uri:"http://localhost:3001/accepted"
  }
  axios.post("https://osu.ppy.sh/oauth/token", requestInfo).then(axiosRes => { //Ask for token
    console.log(axiosRes.data)
    fs.writeFile('../test2/files/selfTokens.json', JSON.stringify(axiosRes.data), function(err){console.log(err)})
    global.selfTokens = axiosRes.data
  }).catch(error => {
    console.error(error)
  })
}

exports.getBotPublicTokens = getBotPublicTokens
