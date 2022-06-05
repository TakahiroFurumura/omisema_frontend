// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
    {
      theme: {
          defaultTheme: 'light',

          themes: {
              light: {
                  colors: {
                      primary: '#406E80',
                      secondary: '#b7266a',
                      accent: '#404A80',
                      error: '#F25E7A',
                      background: '#f5f5f5',
                      info: '#118C8C',
                      disabled: '#a9a9a9',
                  }
              },
          }
      }
    }
)
