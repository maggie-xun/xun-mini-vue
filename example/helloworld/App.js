import { h } from '../../lib/guide-mini-vue.esm.js'
export const App = {
  render() {
    return h(
      'div',
      {
        id: 'root',
        class: ['red']
      },
      [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'mini-vue')]
      //   'hi,' + this.msg
    )
  },
  setup() {
    return {
      msg: 'mini-vue'
    }
  }
}
