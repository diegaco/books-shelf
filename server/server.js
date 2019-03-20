const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const { auth } = require('./middleware/auth');
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

app.get('/api/books', (req, res) => {
  const { user } = req.query;
  Book.find({ ownerId: user }).exec((err, docs) => {
    if (err) return res.status(400).send(err);
    res.send({ data: docs})
  })
})


// POST

app.post('/api/book', (req, res) => {
  const book = new Book(req.body);

  book.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({
      success: true,
      bookId: doc._id
    })
  })
})

app.post('/api/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({
      success: true,
      data: doc
    })
  })
});

app.post('/api/login', (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  if (!email || !password) return res.status(400).send({ message: 'Email & Password are required' });

  User.findOne({'email': req.body.email}, (err, user)=> {
    if (err) return res.status(401).send({ isAuth: false, message: err });
    if (!user) return res.status(401).send({ isAuth: false, message: 'Auth faild' });

    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch) return res.status(401).send({
        isAuth: false,
        message: 'Wrong Password'
      });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).send({
          isAuth: true,
          data: {
            id: user._id,
            email: user.email
          }
        })
      })
    })
  })
})

app.get('/api/private', auth, (req, res) => {
  res.send({
    isAuth: true,
    id: req.user._id,
    email: req.user.name,
    lastname: req.user.lastname
  })
})

app.get('/api/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({status: 'logout'})
  })
})

app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;

  User.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({ name: doc.name, lastname: doc.lastname})
  })
});

app.get('/api/users', (req, res) => {
  User.find({},(err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({ data: doc });
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
    res.status(200).send({success: true, data: doc})
  })
})




app.listen(PORT, () => {
  console.log('Server is running');
})

