import axios from 'axios'
import fs from 'fs'
import {OSU_CLIENT_ID, OSU_SECRET, HOST} from '../files/config.json'

export default function getBotPublicTokens(req: any, res: any){
  let requestInfo = { //Necessary Info to get tokens
    client_id:OSU_CLIENT_ID,
    client_secret:OSU_SECRET,
    code:req.query.code,
    grant_type:"authorization_code",
    redirect_uri:HOST
  }
  axios.post("https://osu.ppy.sh/oauth/token", requestInfo).then((axiosRes: any) => { //Ask for token
    global.selfTokens = axiosRes.data
    console.log(axiosRes.data)
    fs.writeFile('./files/selfTokens.json', JSON.stringify(axiosRes.data), function(){})
    res.redirect("/")
  }).catch(error => {
    console.log("ERR IN GET BOT PUBLIC TOKENS -----------------")
    console.error(error)
  })
}
