const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const urlController = require('../controllers/url');

router.post(
  '/new',
  [
    body('url')
      .isURL({
        require_protocol: true,
        validate_length: true
      })
  ],
  urlController.postShortUrl
);

router.get('/:short_url', urlController.redirectUrl);

module.exports = router;