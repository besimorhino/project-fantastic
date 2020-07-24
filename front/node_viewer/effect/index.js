const Common = require('../../common/effect')
const LoadNodeResults = require('../../common/effect/loadnoderesults')
const FetchScripts = require('../../common/effect/fetchscripts')

const effect = (state, action, send) => {
  Common(state, action, send)
  if (action.type == 'init') FetchScripts(send, 'actions')
  if (action.type == 'node_data') LoadNodeResults([action.data], send)
}

module.exports = effect