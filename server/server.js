const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const { User } = require('./models/user');
const { Book } = require('./models/book');

const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(config.DB);

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());


// GET

app.get('/api/book/:id', (req, res) => {
  let id = req.params.id;
  Book.findById(id, (err, doc) => {
    if (err) return res.status(400).send({ message: 'Book not founded' })
    res.status(200).send({ data: doc })
  })
});

app.get('/api/books', (req, res) => {
  let skip = parseInt(req.query.skip),
      limit = parseInt(req.query.limit),
      order = req.query.order;

  Book.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
    if(err) return res.status(400).send({message: 'Books not founded'})
    res.status(200).send({data: doc})
  })

  // Book.find((err, doc) => {
  //   if(err) return res.status(400).send({message: 'Books not founded'})
  //   res.status(200).send({data: doc})
  // })
})


// POST

app.post('/api/book', (req, res) => {
  const book = new Book(req.body);

  book.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({
      post: true,
      bookId: doc._id
    })
  })
})


// UPDATE

app.put('/api/book/:id', (req, res) => {
  const { id } = req.params;
  Book.findOneAndUpdate(id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({
      success: true,
      data: doc
    })
  })
})


// DELETE

app.delete('/api/book/:id', (req, res) => {
  const { id } = req.params;
  Book.findOneAndDelete({ "_id": id }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({status: "ok", data: doc})
  })
})




app.listen(PORT, () => {
  console.log('Server is running');
})

