const {OSU_API_URL,OSU_CLIENT_ID, OSU_SECRET} = require('../files/config.json')
const {ipAddr, users} = require('../levelExtention.js')
const axios = require('axios')
const fs = require('fs')


const refreshTokens = (refresh_token, self) => {

  let requestInfo = { //Necessary Info to get tokens
    client_id:OSU_CLIENT_ID,
    client_secret:OSU_SECRET,
    grant_type:"refresh_token",
    refresh_token:refresh_token,
    redirect_uri:"http://localhost:3001/accepted",
    scope:"public"
  }

  if(self){ //Refreshing bot's token only
    axios.post("https://osu.ppy.sh/oauth/token", requestInfo).then(axiosRes => { //Ask for token
      ipAddr.put("local", "10669137")
      users.get("10669137").then(user => {
        user.tokenInfo = axiosRes.data
      })
      fs.writeFile('../PWF v2/files/selfTokens.json', JSON.stringify(axiosRes.data), function(err){console.log(err)})
      global.selfTokens = axiosRes.data
    }).catch(err => {
      console.log(err)
    })
  }
  else{
    //TODO
  }
}

exports.refreshTokens = refreshTokens
