const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

const rewrite = (routerPath,path) => {
  // 同步读取router.config.js
  return new Promise((resolve, reject) => {
    var routerData = fs.readFileSync(routerPath)
    routerData = JSON.parse(routerData,"","\t")
    let currentRouter = {
      "name":"登录",
      "path": "/login"
    }  
    routerData.push(currentRouter)

    fs.writeFile(routerPath, JSON.stringify(routerData,null,"\t"), 'utf8', err => {
      if (err) {
        errorLog(err)
        reject(err)
      }else{
        successLog('路由生成成功')
        resolve(routerData.toString())
      }
    })
    
  })
  
}

module.exports = {
  createRouter: async (compoenntName, path) => {
    log(`正在生成界面${compoenntName}的路由...`)

    if (!fs.existsSync(resolve('../src/config/router.config.js'))) {
      errorLog(`router.config.js文件不存在`)
      return
    }

    await rewrite(resolve('../src/config', 'router.json'),path)
    
  }
}