const { ImgurClient } = require('imgur')

const imgur_client = new ImgurClient({
  refreshToken: process.env.IMGUR_REFRESH_TOKEN,
  clientId: process.env.IMGUR_CLIENT_ID,
  clientSecret: process.env.IMGUR_CLIENT_SECRET
})

module.exports = imgur_client