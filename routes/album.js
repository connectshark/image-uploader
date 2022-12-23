const express = require('express')
const router = express.Router()
const controller = require('../controller/albumController')

router.route('/')
  .get(controller.getAlbum)

module.exports = router