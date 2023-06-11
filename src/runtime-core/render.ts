import { isObject } from '../shared/index'
import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}

function patch(vnode, container) {
// ShapeFlags
  const {shapeFlags}= vnode
  if (shapeFlags&ShapeFlags.ELEMNT) {// 处理element
    processElement(vnode, container)
  } else if (shapeFlags&ShapeFlags.STATEFUL_COMPONENT) {// 处理组件
    processComponent(vnode, container)
  }
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(initialVnode: any, container) {
  const instance = createComponentInstance(initialVnode)
  setupComponent(instance)
  setupRenderEffect(instance,initialVnode, container)
}

function setupRenderEffect(instance: any,initialVnode, container) {
  const { proxy } = instance

  const subTree = instance.render.call(proxy)
  patch(subTree, container)
  initialVnode.el = subTree.el
}


function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}
function mountElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type))
  const { props, children, shapeFlags } = vnode

  //handle props
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  //handle children
  if (shapeFlags&ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlags&ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el)
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach(item => {
    patch(item, container)
  })
}
