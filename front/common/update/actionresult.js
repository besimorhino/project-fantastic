const actionResult = (state, action) => {
  if (!state.action_results.data[action.hostname][action.action]) {
    state.action_results.data[action.hostname][action.action] = {}
    state.action_results.foldouts[action.hostname][action.action] = action.result.length ? true : undefined
  }
  state.action_results.status[action.hostname][action.action] = 'loaded'
  action.result.forEach(v => {
    if (!state.action_results.data[action.hostname][action.action][v.id]) state.action_results.data[action.hostname][action.action][v.id] = {value: v.value, foldout: {}, status: {}}
    else state.action_results.data[action.hostname][action.action][v.id].value = v.value
  })
}

module.exports = actionResult