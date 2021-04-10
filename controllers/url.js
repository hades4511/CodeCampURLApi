const { validationResult } = require('express-validator');
const URL = require('../models/URL');

exports.postShortUrl = (req, res, next) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.json({ error: 'invalid url' });
    }
    const fullurl = req.body.url;
    const url = new URL(fullurl);
    url.save()
    .then(result => {
        const { _id, ...response } = url;
        res.json(response);
    })
    .catch(err => console.log(err));
};

exports.redirectUrl = (req, res, next) => {
    const shorturl = parseInt(req.params.short_url);
    URL.get(shorturl)
    .then(url => {
        res.redirect(url.original_url);
    })
    .catch(err => console.log(err));
};