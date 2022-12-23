const imgur_client = require('../imgur/index')

const uploadHandler = async (req, res) => {
  const file = Object.values(req.files)[0]
  const response = await imgur_client.upload({
    image: file.data.toString('base64'),
    type: 'base64',
    album: process.env.IMGUR_ALBUM_ID
  })
  res.json({ url: response.data.link })
}

module.exports = {
  uploadHandler
}