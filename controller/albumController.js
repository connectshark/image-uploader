const imgur_client = require('../imgur/index')
const ALBUM = process.env.IMGUR_ALBUM_ID

const getAlbum = async (req, res) => {
  const myAlbum = await imgur_client.getAlbum(ALBUM)
  res.json(myAlbum)
}

module.exports = {
  getAlbum
}