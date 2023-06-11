import { createVNode } from './vnode'
import { render } from "./render"
export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 先转换为vnode
      // component->vnode
      const vnode = createVNode(rootComponent)
      render(vnode, rootContainer)
    }
  }
}


