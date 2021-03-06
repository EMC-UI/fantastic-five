module.exports = function (express) {
  var router = express.Router()
  var jwt = require('jsonwebtoken')
  router.use(function (req, res, next) {
    // console.log('headers:', req.headers)
    if (req.headers.token || req.body.token) {
      jwt.verify(req.headers.token || req.body.token, 'a super secret phrase', 
      function (err, user) {
        if (err) {
          return res.status(401).json({
            error: 'Unauthorized'
          })
        } else {
          console.log('user:', user._doc) // bar
          req.user = user._doc
          next()
        }
      })
    } else {
     next()
    }
  })
  router.use('/users', require('./users')(express))
  router.use('/questions', require('./questions')(express))
  router.use('/tags', require('./tags')(express))

  router.get('/', function (req, res, next) {
    res.json({msg: 'Welcome to the api'})
  })
  return router
}