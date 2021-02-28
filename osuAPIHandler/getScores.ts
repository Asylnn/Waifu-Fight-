import {OSU_API_URL} from '../files/config.json'
import axios from 'axios'
import getHeaders from './getHeaders'
import {mods} from './interfaces'
import User from '../classes/user'

export default async function getScores(mode: mods, userId: number, numberOfScores:number) {
  console.log(mode)
  let params = {
    include_fails:"1",
    mode:mode,
    limit:numberOfScores,
    //offset:"1"
  }
  let requestInfo = {
    params:params,
    headers:getHeaders(global.selfTokens.access_token)
  }
  let axiosRes = await axios.get(`${OSU_API_URL}users/${userId}/scores/recent`, requestInfo)
  return axiosRes.data

}
