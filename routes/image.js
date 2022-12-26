const express = require('express')
const router = express.Router()
const controller = require('../controller/imageController')
const fileSizeLimiter = require('../middleware/fileSizeLimiter')
const fileUpload = require('express-fileupload')
const fileExtLimiter = require('../middleware/fileExtLimiter')

router.route('/')
  .get(controller.getHandler)
  .post(
    fileUpload({ createParentPath: true }),
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    controller.uploadHandler
  )
  .delete(controller.deleteHandler)
  .patch(controller.updateHandler)

module.exports = router