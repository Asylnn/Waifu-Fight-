import axios from 'axios'
import {ipAddr, users} from '../levelExtention'
import User from '../classes/user'
import {OSU_API_URL, OSU_CLIENT_ID, OSU_SECRET, HOST} from '../files/config.json'
import getHeaders from './getHeaders'


export default function getTokens(req:any, res:any){
  let requestInfo = { //Necessary Info to get tokens
    client_id:OSU_CLIENT_ID,
    client_secret:OSU_SECRET,
    code:req.query.code,
    grant_type:"authorization_code",
    redirect_uri:HOST
  }

  axios.post("https://osu.ppy.sh/oauth/token", requestInfo).then(axiosRes => { //Ask for token
    let tokenInfo = axiosRes.data
    //Ask for the osu profile

    axios.get(OSU_API_URL + "me/osu", {headers:getHeaders(tokenInfo.access_token)}).then(axiosRes => {

      ipAddr.put(req.ip, axiosRes.data.id)

      users.get(axiosRes.data.id).then(user => { //User already existed
        user.tokenInfo = tokenInfo
      }).catch(err => { //First time loggin in
        if(err.notFound){
          users.put(axiosRes.data.id, new User(axiosRes.data.id, axiosRes.data.avatar_url, axiosRes.data.username, tokenInfo))
        }
        else{
          res.send("sorry, some error happened, try again later (ERR3)")
          console.error(err)
        }
      })

      res.redirect("/")


    }).catch(error => {
      res.send("sorry, some error happened, try again later (ERR1)")
      //console.error(error)
    })

  }).catch(error => {
    res.send("sorry, some error happened, try again later (ERR2)")
    //console.error(error)
  })
}
