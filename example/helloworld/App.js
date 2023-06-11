import { h } from '../../lib/guide-mini-vue.esm.js'
window.seft=null
export const App = {
    render() {
        window.self=this
    return h(
      'div',
      {
        id: 'root',
        class: ['red']
      },
    //   [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'mini-vue')]
        'hi,' + this.msg
    )
  },
  setup() {
    return {
      msg: 'mini-vue'
    }
  }
}
