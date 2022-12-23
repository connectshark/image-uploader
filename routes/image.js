const express = require('express')
const router = express.Router()
const controller = require('../controller/uploadController')
const fileUpload = require('express-fileupload')

router.route('/')
  .post(fileUpload({ createParentPath: true }), controller.uploadHandler)
  .delete(controller.deleteHandler)
  .patch(controller.updateHandler)

module.exports = router