import { isObject } from '../shared/index'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}

function patch(vnode, container) {

  if (typeof vnode.type === 'string') {// 处理element
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {// 处理组件
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
  const { props, children } = vnode

  //handle props
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  //handle children
  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el)
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach(item => {
    patch(item, container)
  })
}
