import express from 'express'
import bodyParser from 'body-parser'
import mongodb from 'mongodb'

const app = express()
const jsonParser = bodyParser.json()
const PORT = 5001
const URL = "mongodb://localhost:27017/";

let books;
mongodb.MongoClient.connect(URL, (err, db) => {
    if (err) throw err
    const dbo = db.db("teeeest")
    books = dbo.collection("books")
});

app.post('/book', jsonParser, (req, res) => {
    const book = req.body;
    books.insertOne(book, (err, result) => {
        if (err)  res.status(500).json({ err: err })
        res.status(200).json({ ok: true })
    })
});

app.get('/books', (req, res) => {
   // res.json(books);
    books.find().toArray((err, items) => {
        if (err) res.status(500).json({ err: err })
        res.status(200).json({ books: items })
    })
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

