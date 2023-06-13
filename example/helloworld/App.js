import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'
window.seft = null
export const App = {
  name: 'APP',
  render() {
    window.self = this
    return h(
      'div',
      {
        id: 'root',
        class: ['red'],
        onClick() {
          console.log('click')
        }
      },
      //   [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'mini-vue')]
      // 'hi,' + this.msg
      [h('div', {}, 'hi'), h(Foo, { count: 1 })]
    )
  },
  setup() {
    return {
      msg: 'mini-vue'
    }
  }
}
