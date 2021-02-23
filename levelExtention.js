const level = require('level')
const ipAddr = level('Files/ipAddr',{ valueEncoding: 'utf8' })
const users = level('Files/users',{ valueEncoding: 'json' })
const {user} = require("./classes/user")


users.getUser = async function(userId){
  let userP = await users.get(userId)
  return Object.assign(new user, userP)
}

exports.ipAddr = ipAddr
exports.users = users

//global.db = {ipAddr:ipAddr, users:users}
