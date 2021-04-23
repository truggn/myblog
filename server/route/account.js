const express = require('express')
const accountController = require('../controller/accountController')
const route = express.Router()
const auth = require('../middleware/auth')

// @ PATCH UPDATE PASSWORD 
route.put('/update-password', auth, accountController.updatePassword)
// @ PUT UPDATE ACOUNT -> { không có cập nhật mật khẩu và email trong router này}
route.put('/update-account', auth, accountController.updateAcount)




module.exports = route