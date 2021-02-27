import level from 'level-ts'

//level-ts does only support JSON, that cause problems when using non JSON objects (ex :maps)
//we will need to use level package
//import level from 'level'
//const db = level('./files',{ valueEncoding: 'customEncoding' })
//const dbts = levelts(db)
export const ipAddr = new level('Files/ipAddr')
export const users = new level('Files/users')

import User from "./classes/user"


(users as any).getUser = async function(userId: number){
  let userP = await users.get(""+userId)
  return Object.assign(new User(0,"0","0",{access_token:"0", expires_in:0,refresh_token:"",token_type:""}), userP)
}
