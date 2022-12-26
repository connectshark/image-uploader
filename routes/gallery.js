const express = require('express')
const router = express.Router()
const controller = require('../controller/galleryController')

router.route('/')
  .get(controller.getGallery)

module.exports = router