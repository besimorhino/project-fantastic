import {h} from 'snabbdom/h'

const hosts = ['local', 'remote']
const timeUnits = ['d', 'h', 'm']

export default (state, send) => [
  h('h2', 'Quest Settings'),
  h('div.column', [
    h('label.label', {attrs: {for: 'quest-description-editor'}}, 'Description'),
    h('textarea#quest-description-editor', {
      attrs: {rows: 7},
      on: {input: e => send({type: 'set_quest_description', description: e.target.value})}
    }, state.editor.description || '')
  ]),
  h('div.column', [
    h('div.label', 'Host Types'),
    ...hosts.map(host => h('span', [
      h('input', {
        attrs: {type: 'checkbox', id: `host-type-${host}`},
        props: {checked: state.editor.config.hosts.includes(host)},
        on: {input: e => send({type: 'enable_quest_host_type', enabled: e.target.checked, host})}
      }),
      h('label', {attrs: {for: `host-type-${host}`}}, host)
    ]))
  ]),
  h('div.column', [
    h('div.label', 'Host Selection'),
    h('span', [
      h('input', {
        attrs: {type: 'checkbox', id: 'quest-selection-age'},
        props: {checked: state.editor.config.selection.age.enabled},
        on: {input: e => send({type: 'enable_quest_age', enabled: e.target.checked})}
      }),
      h('label', {attrs: {for: 'quest-selection-age'}}, 'Maximum Age')
    ]),
    ...(state.editor.config.selection.age.enabled ? timeUnits.map(unit => h('span', [
      h('input', {
        attrs: {type: 'number', id: `quest-selection-age-${unit}`},
        props: {value: state.editor.config.selection.age[unit]},
        on: {input: e => send({type: 'set_quest_age', value: e.target.value, unit})}
      }),
      h('label', {attrs: {for: `quest-selection-age-${unit}`}}, unit)
    ])) : [])
  ])
]