import {h} from 'snabbdom/h'

export default (state, send) => {
  if (!state.story.selected) return
  const storyData = state.stories[state.story.selected]
  return Object.entries(storyData.nodeData).map(node => {
    const data = state[node[1].type][node[1].key]
    const parentNodes = Object.entries(storyData.nodeData).filter(other => other[1].targets.includes(node[0])) // find nodes leading to this one
    const locked = parentNodes.length && !parentNodes.some(node => state.story.completed[state.story.selected] && state.story.completed[state.story.selected][node[0]]) // check if we have completed any
    return h('div.node', {
      on: {
        click: e => {
          if (locked) return
          send({type: 'select_story_node', node: node[0]})
          e.stopPropagation()
        }
      },
      attrs: { id: node[0] },
      class: {
        highlight: state.story.selected_node == node[0],
        locked,
        completed: state.story.completed[state.story.selected] && state.story.completed[state.story.selected][node[0]]
      },
      style: {
        position: 'absolute',
        left: `${node[1].position.x}px`,
        top: `${node[1].position.y}px`
      },
      hook: {
        destroy: vnode => state.story.jsplumb.unmanage(vnode.elm)
      }
    }, h('div.node-label', data.name))
  })
}