const imgur_client = require('../imgur/index')
const ALBUM = process.env.IMGUR_ALBUM_ID

const getAlbum = async (req, res) => {
  const response = await imgur_client.getAlbum(ALBUM)
  if (response.success) {
    res.status(200).json(response.data)
  } else {
    res.status(400).json(response.data)
  }
}

module.exports = {
  getAlbum
}