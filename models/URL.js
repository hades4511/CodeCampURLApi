const getdb = require('../util/database').getdb;

module.exports = class URL{
    constructor(url, shortUrl){
        this.original_url = url;
        this.short_url = shortUrl;
    }

    getshorturl(){
        const db = getdb();
        return db.collection('urls').find().count()
        .then(count => {
            this.short_url = count + 1;
        })
    }

    async save(){
        const db = getdb();
        if(!this.short_url){
            await this.getshorturl();
        }
        return db.collection('urls').insertOne(this);
    }

    static get(shorturl){
        const db = getdb();
        return db.collection('urls').find({ short_url: shorturl }).next();
    }
};