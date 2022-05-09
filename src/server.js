//@ts-check
require('make-promises-safe')
require('dotenv').config()

const configService = require('./config/configService')
const app = require('./app')

async function main() {
  const PORT = configService.getConfig('PORT')

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

main().catch((err) => {
  console.log(err)
  process.exit(1)
})
