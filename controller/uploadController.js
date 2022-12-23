const imgur_client = require('../imgur/index')
const ALBUM = process.env.IMGUR_ALBUM_ID

const uploadHandler = async (req, res) => {
  const file = Object.values(req.files)[0]
  if (!hash) {
    return res.status(400).json({ msg: 'File Required' })
  }
  const response = await imgur_client.upload({
    image: file.data.toString('base64'),
    type: 'base64',
    album: ALBUM
  })
  res.json({ url: response.data.link })
}

const deleteHandler = async (req, res) => {
  const { hash } = req.body
  if (!hash) {
    return res.status(400).json({ msg: 'Image hash Required' })
  }
  const response = await imgur_client.deleteImage(hash)
  res.json(response)
}

const updateHandler = async (req, res) => {
  const { hash, title } = req.body
  if (!hash) {
    return res.status(400).json({ msg: 'Image hash Required' })
  }
  const response = await imgur_client.updateImage({
    imageHash: hash,
    title
  })
  if (response.success) {
    res.json(response)
  }
}

module.exports = {
  uploadHandler,
  deleteHandler,
  updateHandler
}