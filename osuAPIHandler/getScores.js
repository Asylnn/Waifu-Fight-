const {OSU_API_URL} = require('../files/config.json')
const axios = require('axios')
const {getHeaders} = require('./getHeaders.js')

var getScores = async function(mode, user, numberOfScores) {
  let params = {
    include_fails:"1",
    mode:mode,
    limit:numberOfScores,
    //offset:"1"
  }
  let axiosRes = await axios.get(`${OSU_API_URL}users/${user.id}/scores/recent`, {params:params, headers:getHeaders(global.selfTokens.access_token)})
  return axiosRes.data



  //return await axios.get(OSU_API_URL + "me/osu", {headers:getHeaders(access_token)}).data

}

exports.getScores = getScores
