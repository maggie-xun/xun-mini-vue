import { h } from '../../lib/guide-mini-vue.esm.js'
window.seft = null
export const App = {
  name: 'APP',
  render() {
    window.self = this
    return h(
      'rect',
      {
        x: this.x,
        y: this.y
      }
    )
  },
  setup() {
    return {
      x: 100,
      y:100
    }
  }
}
