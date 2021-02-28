import express from 'express'
const app = express()
import {ipAddr, users} from './levelExtention.js'
ipAddr.put("local", "10669137")
const server = require('http').createServer(app);
const io = require('socket.io')(server);
import fs from 'fs'

declare global {
  var selfTokens: tokenInfo
}

import refreshTokens from './osuAPIHandler/refreshTokens'
import getTokens from "./osuAPIHandler/getTokens"
import getBotPublicTokens from './osuAPIHandler/getBotPublicTokens'
import deleteTokens from './osuAPIHandler/deleteTokens'
import {mods, tokenInfo} from './osuAPIHandler/interfaces'

import updateClientScores from "./clientServerCommunication/updateClientScores"


const refreshBotTokens = () => {
  refreshTokens(global.selfTokens.refresh_token, true) //Refreshing the bot's token for API access
}

fs.readFile('./files/selfTokens.json', function(_err, data) {
  global.selfTokens = JSON.parse(data as unknown as string)
  refreshTokens(global.selfTokens.refresh_token, true) //Refreshing the bot's token for API access
  setInterval(refreshBotTokens, 86000000) //Needs to be tested, refresh API tokens every day
});










import {HOST, OSU_CLIENT_ID, PORT, OSULOGOURL, CONNECTTEXT, TIME_BETWEEN_SCORES_REQUEST} from './files/config.json'
const REDIRECT_URL = `https://osu.ppy.sh/oauth/authorize?client_id=${OSU_CLIENT_ID}&redirect_uri=${HOST}&response_type=code&scope=identify`
const SELF_REDIRECT_URL = `https://osu.ppy.sh/oauth/authorize?client_id=${OSU_CLIENT_ID}&redirect_uri=${HOST}&response_type=code&scope=public`

//INIT
app.use(express.static("./dist/public"));
app.set('trust proxy', true)
server.listen(PORT, () => {
  console.log("listening...");
});
//INIT END

io.on('connection', (socket: any) => {
  if(socket.request.connection.remoteAddress == "::1" || socket.request.connection.remoteAddress == "::ffff:127.0.0.1"){
    socket.clientIp = "local"
  }

  console.log("new connexion from", socket.clientIp)

  socket.userClient = {id:"-1", imgURL:OSULOGOURL, username:CONNECTTEXT, registred:false} //userClient with limited data
  socket.user = socket.userClient //user is server side user with all data
  socket.emit('info', {redirectURL:REDIRECT_URL, timeBetweenScoresRequest:TIME_BETWEEN_SCORES_REQUEST}) //give redirectURL to client

  /*socket.on('disconnect', () => {
    console.log(socket.clientIp, "disconnected")
  })*/

  socket.on('requestScores', (data: mods) => {
    console.log("what")
    updateClientScores(socket, data)
  })

  ipAddr.get(socket.clientIp).then(async function(userId){
    if(userId != "-1"){
      socket.user = await (users as any).getUser(userId)
      socket.userClient = socket.user.convertToClient()
    }
  }).catch((err) => {
    if(err.notFound){ //If the user connect to the site for the first time
      ipAddr.put(socket.clientIp, -1) // -1 for not connected
    }
    else{
      console.log(err)
    }
  }).finally(() => {
    socket.emit('userInfo', socket.userClient) //send user to the client as first connection
  })

  socket.on('logout', () => { //Client want to log out
    deleteTokens(socket)
  })

})

app.get('/', (_req, res) => {
  res.redirect('/main.html')
});

app.get('/login', (_req, res) => {
  res.redirect(REDIRECT_URL)
});

app.get('/loginBot', (_req, res) => {
  res.redirect(SELF_REDIRECT_URL)
});

app.get('/accepted', (req, res) => { //OAuth2 Request
  if(req.ip == "::1" || req.ip == "::ffff:127.0.0.1"){
    getBotPublicTokens(req, res)
  }
  else {
    getTokens(req, res)
  }
});
