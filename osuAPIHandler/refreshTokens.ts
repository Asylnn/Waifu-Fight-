import {OSU_CLIENT_ID, OSU_SECRET, HOST} from '../files/config.json'
import {ipAddr, users} from '../levelExtention.js'
import axios from 'axios'
import fs from 'fs'


export default function refreshTokens(refresh_token:string, self:boolean){

  let requestInfo = { //Necessary Info to get tokens
    client_id:OSU_CLIENT_ID,
    client_secret:OSU_SECRET,
    grant_type:"refresh_token",
    refresh_token:refresh_token,
    redirect_uri:HOST,
    scope:"public"
  }

  if(self){ //Refreshing bot's token only
    axios.post("https://osu.ppy.sh/oauth/token", requestInfo).then(axiosRes => { //Ask for token
      (global as any).selfTokens = axiosRes.data
      fs.writeFile('./files/selfTokens.json', JSON.stringify(axiosRes.data), function(err){console.log(err)})
      ipAddr.put("local", "10669137")
      users.get("10669137").then(user => {
        user.tokenInfo = axiosRes.data
      })
    }).catch(() => {
      console.log("ERROR: token expired")
      //console.log(err)
    })
  }
  else{
    //TODO
  }
}
