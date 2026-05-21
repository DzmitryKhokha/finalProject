require('dotenv').config();

module.exports = {
  default: {
    // Load TypeScript support
    requireModule: ['ts-node/register'],

    // Load support files and step definitions
    require: [
      'src/support/world.ts',
      'src/support/hooks.ts',
      'src/step-definitions/**/*.ts',
      'src/utils/world.ts',
      'src/utils/hooks.ts',
    ],

    // Location of feature files
    paths: ['features/**/*.feature'],

    // Reporters
    format: [
      'progress',
      'html:cucumber-reports/cucumber-report.html',
      'json:cucumber-reports/cucumber-report.json'
    ],

    // Generate async/await snippets
    formatOptions: {
      snippetInterface: 'async-await'
    },

    // Parallel execution
    parallel: 1,

    // Step timeout (60 seconds)
    timeout: 60000
  }
};

