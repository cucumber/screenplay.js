const path = require('path')
const defaultOptions = "--require features/support/env.js --require 'features/**/*.ts' --publish-quiet"
const tasks = path.join(__dirname, 'features', 'support', 'tasks')

module.exports = {
  default: `${defaultOptions} --world-parameters ${JSON.stringify({
    tasks: path.join(tasks, 'session'), 
    session: 'DomainSession'
  })}`,
  dom: `${defaultOptions} --world-parameters ${JSON.stringify({
    tasks: path.join(tasks, 'dom'),
    session: 'DomainSession'
  })}`,
  domHttp: `${defaultOptions} --world-parameters ${JSON.stringify({
    tasks: path.join(tasks, 'dom'),
    sessions: 'HttpSession'
  })}`,
  http: `${defaultOptions} --world-parameters ${JSON.stringify({
    tasks: path.join(tasks, 'session'),
    sessions: 'HttpSession'
  })}`,
}
