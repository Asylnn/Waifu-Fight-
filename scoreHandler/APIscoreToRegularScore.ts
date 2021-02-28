import Score from '../classes/score'

export default function APIscoreToRegularScore(APIscore: any) : Score{
  return {
    difficulty:APIscore.beatmap.difficulty_rating,
    length:APIscore.beatmap.hit_length,
    maxCombo:APIscore.max_combo,
    maxComboMap:APIscore.beatmap.count_circles + APIscore.beatmap.count_sliders + APIscore.beatmap.count_spinners,
    accuracy:APIscore.accuracy,
    title:APIscore.beatmapset.title,
    rank:APIscore.rank,
    mods:APIscore.mods,
    gamemode:APIscore.mode,
    reactMapId:APIscore.id
  }
}
