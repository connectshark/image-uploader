const imgur_client = require('../imgur/index')
const ALBUM = process.env.IMGUR_ALBUM_ID

const getHandler = async (req, res) => {
  const { hash } = req.query
  if (!hash) {
    return res.status(400).json({ msg: 'Hash Required' })
  }

  const response = await imgur_client.getImage(hash)
  if (response.success) {
    res.status(200).json(response.data)
  } else {
    res.status(400).json(response.data)
  }
}

const uploadHandler = async (req, res) => {
  const file = Object.values(req.files)[0]
  if (!file) {
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
  if (response.success) {
    res.status(200).json(response.data)
  } else {
    res.status(400).json(response.data)
  }
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
    res.status(200).json(response.data)
  } else {
    res.status(400).json(response.data)
  }
}

module.exports = {
  uploadHandler,
  deleteHandler,
  updateHandler,
  getHandler
}