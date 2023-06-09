import { ShapeFlags } from '../shared/ShapeFlags'

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    shapeFlags: getShapeFlags(type),
    el: null,
  }

  //children
  if (typeof children == 'string') {
    vnode.shapeFlags = vnode.shapeFlags | ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeFlags = vnode.shapeFlags | ShapeFlags.ARRAY_CHILDREN
  }
  return vnode
}

function getShapeFlags(type) {
  return typeof type === 'string'
    ? ShapeFlags.ELEMNT
    : ShapeFlags.STATEFUL_COMPONENT
}
