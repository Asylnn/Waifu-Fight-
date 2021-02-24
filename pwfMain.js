const express = require('express')
const app = express()
const axios = require('axios')
const {ipAddr, users} = require('./levelExtention.js')
ipAddr.put("local", "10669137")
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs')
global.selfTokens = {}

const {refreshTokens} = require('./osuAPIHandler/refreshTokens')
const {getTokens} = require("./osuAPIHandler/getTokens")
const {getBotPublicTokens} = require('./osuAPIHandler/getBotPublicTokens')

const refreshBotTokens = () => {
  refreshTokens(selfTokens.refresh_token, true) //Refreshing the bot's token for API access
}

fs.readFile('./files/selfTokens.json', function(err, data) {
  selfTokens = JSON.parse(data)
  refreshTokens(selfTokens.refresh_token, true) //Refreshing the bot's token for API access
  setInterval(refreshBotTokens, 86000000) //Needs to be tested, refresh API tokens every day
});






const {deleteTokens} = require('./osuAPIHandler/deleteTokens')
const {updateClientScores} = require("./clientServerCommunication")



const {HOST, OSU_CLIENT_ID, PORT, OSULOGOURL, CONNECTTEXT} = require('./files/config.json')
const REDIRECT_URL = `https://osu.ppy.sh/oauth/authorize?client_id=${OSU_CLIENT_ID}&redirect_uri=${HOST}/accepted&response_type=code&scope=identify`
const SELF_REDIRECT_URL = `https://osu.ppy.sh/oauth/authorize?client_id=${OSU_CLIENT_ID}&redirect_uri=${HOST}/accepted&response_type=code&scope=public`

var allClients = {}
var i = 0

//INIT
app.use(express.static("public"));
app.set('trust proxy', true)
server.listen(PORT, () => {
  console.log("listening...");
});
//INIT END



io.on('connection', socket => {
  if(socket.request.connection.remoteAddress == "::1" || socket.request.connection.remoteAddress == "::ffff:127.0.0.1"){
    socket.clientIp = "local"
  }

  console.log("new connexion from", socket.clientIp)

  socket.userClient = {id:"-1", imgURL:OSULOGOURL, username:CONNECTTEXT, registred:false} //userClient with limited data
  socket.user = socket.userClient //user is server side user with all data
  socket.emit('info', {redirectURL:REDIRECT_URL}) //give redirectURL to client



  socket.on('disconnect', () => {

    console.log(socket.clientIp, "disconnected")

    if(socket.user.id != "-1"){ //IP address is enregistred but never connected
      clearInterval(allClients[socket.user.id].intervalId) //We stop all automatic request to the osu API
      delete allClients[socket.user.id]
    }
  })


  ipAddr.get(socket.clientIp).then(async function(userId){
    if(userId != "-1"){
      socket.user = await users.getUser(userId)
      socket.userClient = socket.user.convertToClient()
      allClients[userId] = {
        intervalId:setInterval(function(){updateClientScores(socket)}, 7500) //We make automatic request to osu API
      }
    }
    else{
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



  socket.on('logout', data => { //Client want to log out
    deleteTokens(socket)
  })

  socket.on('testing', data => { //Client want to log out
    updateClientScores(socket)
  });
})

app.get('/', (req, res) => {
  res.redirect('/main.html')
});

app.get('/login', (req, res) => {
  res.redirect(REDIRECT_URL)
});

app.get('/loginBot', (req, res) => {
  res.redirect(SELF_REDIRECT_URL)
});

app.get('/accepted', (req, res) => { //OAuth2 Request
  if(req.ip == "::1" || req.ip == "::ffff:127.0.0.1"){
    req.ip = "local"
    getBotPublicTokens(req)
  }

  getTokens(req, res)
});
