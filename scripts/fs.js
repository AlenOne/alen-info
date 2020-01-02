const fs = require('fs')
const path = require('path')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
let routerPath = resolve('../src/config', 'router.json')
    var routerData = '123123213'
    console.log(routerData)

    fs.writeFile(routerPath, JSON.stringify(routerData), err => {
      if (err) {
        errorLog(err.message)
      }
    })