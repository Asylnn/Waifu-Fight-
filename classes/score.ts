import {mods} from '../osuAPIHandler/interfaces'

export default interface Score {
    difficulty:number
    length:number
    maxCombo:number
    maxComboMap:number
    accuracy:number
    title:string
    rank:string
    mods:string[]
    reactMapId:number
    gamemode:mods
    xp?:number
}
