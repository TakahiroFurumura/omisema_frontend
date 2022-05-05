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
                      primary: '#0E6973',
                      secondary: '#A60A33',
                      accent: '#F25E7A',
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
