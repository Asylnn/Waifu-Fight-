const {deepCopy} = require("../functions/copy")
var db


class user {
  constructor(id, imgURL, username, tokenInfo, ) {
    this.id = id
    this.imgURL = imgURL
    this.username = username
    this.registred = true
    this.tokenInfo_ = tokenInfo
    this.xp = 0
    this.lastScoreId_ = 0
  }
  set tokenInfo(info){
    this.tokenInfo_ = info
    db.put(this.id, this)
  }
  get tokenInfo(){
    return this.tokenInfo_
  }
  set lastScoreId(lastScoreId){
    this.lastScoreId_ = lastScoreId
    db.put(this.id, this)
  }
  get lastScoreId(){
    return this.lastScoreId_
  }

  giveXP(xp){
    this.xp += xp
    db.put(this.id, this)
  }

  convertToClient(){
    let clientUser = deepCopy(this)
    delete clientUser.tokenInfo_
    return clientUser
  }

}

setTimeout(function () {
  var {users} = require('../levelExtention.js')
  db = users
}, 100)

exports.user = user
