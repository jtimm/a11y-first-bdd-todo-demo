import { defineBdd } from 'playwright-bdd';

export default defineBdd({
  features: 'tests/features/**/*.feature',
  steps: [
    'tests/steps/**/*.ts'
  ]
});
