// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import Maciasl from './Maciasl'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
    el: '#layoutView',
    template: '<Maciasl/>',
    components: {
        Maciasl
    }
})
