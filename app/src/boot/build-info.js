// src/boot/build-info.js
import { boot } from 'quasar/wrappers'

const buildDate = new Date().toISOString()

export default boot(({ app }) => {
  app.config.globalProperties.$buildDate = buildDate
})

export { buildDate }
