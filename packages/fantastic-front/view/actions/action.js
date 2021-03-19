import {h} from 'snabbdom/h'
import HostString from '../../util/hoststring'
import Result from './result'
import TimeAgo from '../../util/timeago'
import Run from './run'
import Command from './command'

export default (state, send, node, connection, action, action_data) => {
  const result_data = state.action_results[node.hostname] && state.action_results[node.hostname][action]
  const loading = result_data && result_data.status === 'loading'
  const id = `${action}-foldout`
  return h('div.scroll_item spaced', {
    hook: {
      insert: vnode => {
        if (action == state.selected_item) {
          vnode.elm.scrollIntoView()
          setTimeout(e => send({type: 'select_item', item: null}))
        } 
      },
      postpatch: vnode => {
        if (action == state.selected_item) {
          vnode.elm.scrollIntoView()
          setTimeout(e => send({type: 'select_item', item: null}))
        } 
      }
    },
    key: `${action}-item`
  }, [
    h('input.auto_foldout', {
      attrs: {type: 'checkbox', id, checked: state.foldout_checkboxes[id]},
      on: {input: e => send({type: 'foldout_checkbox', id, value: e.target.checked})}
    }),
    Run(state, send, node, connection, action, action_data.name, id, loading),
    h('div.foldout_child', [
      Command(connection, action_data.commands.run),
      action_data.description ? action_data.description : undefined,
      h('div.targets', [h('b', 'Valid targets:'), ` ${action_data.hosts.map(HostString).join(', ')}.`]),
      result_data && result_data.result ? h('div.results', [
        h('div.followup', [
          `Results from ${TimeAgo(result_data.date)}`, 
          h(`div.foldout fas fa-${result_data.foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {
            on: {click: [send, {type: 'result_foldout', action, hostname: node.hostname, value: !result_data.foldout}]}
          })
        ]),
        ...(result_data.foldout ? result_data.result
          .map(r => Result(state, action, r, node.node_id, node.hostname, loading, result_data.filter, send)) : [])
      ]) : undefined
    ])

  ])
}