const express = require('express')
const app = express()
const nano = require('nano')(`http://${config.db.host}:${config.db.port}`)
const db = nano.use(config.db.collection)
const axios = require('axios')
const async = require('async')
const Extractor = require('html-extractor')
const gramophone = require('gramophone')
const stopwords = require('stopwords').english
const extractor = new Extractor()
app.get('/', (req,res,next) => {
  db.list({include_docs: true}, (err,docs) => {
    if (err) next(err)
    else {
      var docs = docs.rows.map(d => d.doc)
      async.each(docs, (doc, nextdoc) => {
        axios.get(doc.href).then(resp => {
          extractor.extract(resp.data, (err, data) => {
            doc.title = data.meta.title
            doc.html = data.body.replace('New Search View Indeed in: Mobile - Classic','')
            doc.tags = gramophone.extract(doc.html, {
              stopwords: stopwords,
              score: true
            }).map(t => ({value: t.term, count: t.tf}))
            nextdoc()
          })          
        }).catch(err => nextdoc())        
      }, err => {
        if (err) next(err)
        else res.send(docs)
      })
    }    
  })
})
module.exports = app