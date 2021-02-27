export type mods =  "osu" | "mania" | "fruits" | "taiko"

export interface tokenInfo {
  access_token:string
  refresh_token:string
  token_type:string
  expires_in:number
}

export interface reducedScore {
    difficulty:number
    length:number
    maxCombo:number
    maxComboMap:number
    accuracy:number
    title:string
    rank:string
    mods:string[]
    reactMapId:number
    xp:number
}
