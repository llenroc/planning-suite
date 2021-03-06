const voteSettings = [
  ['token', 'tokenAddress'],
  ['voteTime', 'voteTime', 'time'],
  ['PCT_BASE', 'pctBase', 'number'],
  ['globalCandidateSupportPct', 'globalCandidateSupportPct', 'number'],
  ['minParticipationPct', 'minParticipationPct', 'number'],  
]

export function hasLoadedVoteSettings(state) {
  state = state || {}
  return voteSettings.reduce((loaded, [key]) => loaded && !!state[key], true)
}

export default voteSettings
