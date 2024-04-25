import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import '@vuepic/vue-datepicker/dist/main.css'
import './styles/custom.css'
import VueDatePicker from '@vuepic/vue-datepicker'

const app = createApp(App)
        .use(store)
        .use(router)
        .use(CoreuiVue)
        .provide('icons', icons)
        .component('CIcon', CIcon)
        .component('DocsExample', DocsExample)
        .component('VueDatePicker', VueDatePicker)
        .mount('#app')

export default app