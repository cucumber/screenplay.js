const path = require('path')
const defaultOptions = "--require features/support/env.js --require 'features/**/*.ts' --publish-quiet"
const interactions = path.join(__dirname, 'features', 'support', 'interactions')

module.exports = {
  default: `${defaultOptions} --world-parameters ${JSON.stringify({
    interactions: path.join(interactions, 'session'), 
    session: 'DomainSession'
  })}`,
  dom: `${defaultOptions} --world-parameters ${JSON.stringify({
    interactions: path.join(interactions, 'dom'),
    session: 'DomainSession'
  })}`,
  domHttp: `${defaultOptions} --world-parameters ${JSON.stringify({
    interactions: path.join(interactions, 'dom'),
    sessions: 'HttpSession'
  })}`,
  http: `${defaultOptions} --world-parameters ${JSON.stringify({
    interactions: path.join(interactions, 'session'),
    sessions: 'HttpSession'
  })}`,
}
