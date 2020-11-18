import "material-design-icons-iconfont/dist/material-design-icons.css"
import Vue from "vue"
import Vuetify from "vuetify/lib"
import { colors } from "vuetify/lib"

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: "md"
  },
  theme: {
    light: {
      background: colors.blue.accent2
    },
    dark: false
  }
})