const config = {
  prod: {
    SECRET: process.env.SECRET,
    DB: process.env.MONGODB_URI
  },
  dev: {
    SECRET: 'SuperSECRETPassword',
    DB: 'mongodb://localhost:27017/books_shelf'
  }
}

exports.get = function get(env) {
   return config[env] || config.dev
}