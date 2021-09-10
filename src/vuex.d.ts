// eslint-disable-next-line no-unused-vars
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { State } from './store/index'

declare module '@vue/runtime-core' {
  // eslint-disable-next-line no-unused-vars
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
