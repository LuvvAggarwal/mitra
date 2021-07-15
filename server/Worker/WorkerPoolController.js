'use strict'

// const workerpool = require('workerpool')

'use strict'

const WorkerPool = require('workerpool')
const Path = require('path')

let poolProxy = null

// FUNCTIONS
const init = async (options) => {
  const pool = WorkerPool.pool(Path.join(__dirname, './thread_functions.js'), options)
  // poolProxy = await pool.proxy().then(console.log("proxy"))
  console.log(`Worker Threads Enabled - Min Workers: ${pool.minWorkers} - Max Workers: ${pool.maxWorkers} - Worker Type: ${pool.workerType}`)
  console.log("Worker Stats " + JSON.stringify(pool.stats()));
  console.log("Worker proxy " + JSON.stringify(poolProxy));
}

const get = () => {
  return poolProxy
}

// EXPORTS
exports.init = init
exports.get = get