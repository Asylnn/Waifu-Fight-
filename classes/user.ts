import {deepCopy} from "../functions/copy"
import {mods, tokenInfo} from '../osuAPIHandler/interfaces'
var db: any


export default class User {
  public readonly registred = true
  public readonly id: number
  public imgURL: string
  public username: string
  private _tokenInfo: tokenInfo
  private _lastScoreId = '0'
  public xp = 0
  public playCount = {"osu":0, "fruits":0, "mania":0, "taiko":0}

  constructor(id: number, imgURL: string, username: string, tokenInfo:tokenInfo) {
    this.id = id
    this.imgURL = imgURL
    this.username = username
    this._tokenInfo = tokenInfo
  }

  set tokenInfo(info){
    this._tokenInfo = info
    db.put(this.id, this)
  }
  get tokenInfo(){
    return this._tokenInfo
  }

  set lastScoreId(lastScoreId){
    this._lastScoreId = lastScoreId
    db.put(this.id, this)
  }
  get lastScoreId(){
    return this._lastScoreId
  }

  giveXP(xp: number){
    this.xp += xp
    db.put(this.id, this)
  }

  incrementPlayCount(mode: mods){
    this.playCount[mode]
    db.put(this.id, this)
  }

  convertToClient(){
    let clientUser = deepCopy(this)
    delete clientUser.tokenInfo_
    return clientUser
  }
}

setTimeout(function () {
  //User and LevelExtention are in a require circle, to circumvent this we request levelExtention in delay
  var {users} = require('../levelExtention.js')
  db = users
}, 100)
