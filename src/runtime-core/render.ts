import { isObject } from '../shared/index'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}

function patch(vnode, container) {
  // 处理组件
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container) {
  const subTree = instance.render()
  patch(subTree, container)
}
function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}
function mountElement(vnode: any, container: any) {
  const el = document.createElement(vnode.type)
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
    mountChildren(vnode,el)
  }

  container.append(el)
  // el.setAttribute("id","root")
}

function mountChildren(vnode, container) {
  vnode.children.forEach(item => {
    patch(item, container)
  })
}
