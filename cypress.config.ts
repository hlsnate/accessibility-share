import { defineConfig } from 'cypress'

export default defineConfig({
  viewportHeight: 1200,
  experimentalStudio: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts').default(on, config)
    },
    specPattern: 'cypress/e2e/**/*spec.ts',
    baseUrl: 'http://localhost:3000',
  },
  component: {
    setupNodeEvents(on, config) {},
    specPattern: 'src/lib/**/*spec.ts',
  },
})
