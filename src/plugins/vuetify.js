/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDateInput } from 'vuetify/labs/VDateInput'



// Composables
import { createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'
import { mdi } from 'vuetify/iconsets/mdi'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides



export default createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  
  components:{
    VDateInput,
  },
  
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,mdi,
    },
  },
})

