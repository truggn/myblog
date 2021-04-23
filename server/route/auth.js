const express = require('express')
const accountController = require('../controller/accountController')
const route = express.Router()
const auth = require('../middleware/auth')
const Account = require('../model/account')
const multer = require('multer')

const storage = multer.diskStorage({
    // nơi file được lưu lại 
    destination: function (req, file, callback) {
        callback(null, './upload/avata');
    },
    // 
    filename: function (req, file, callback) {
        // chi nhan nhung file image duoi jpeg va png
        let math = ["image/png", "image/jpeg"]
        if (math.indexOf(file.mimetype) === -1) {
            let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
            return callback(errorMess, null);
        }
        //Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
        let fileName = `${Date.now()}-avata-${file.originalname}`;
        callback(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
})

// @route POST api/auth/register
// @descri  Register user
// @access public 
route.post('/register', upload.single('avata'), accountController.createAcount)

// @route POST api/auth/login
// @descri  login acount
// @access public 
route.post('/login', accountController.loginPage)


//@route get api/auth 
//@desc check if user is login
//@access public 
route.get('/', auth, async (req, res) => {
    try {
        const user = await Account.findById(req.userId).select('-password')
        if (!user) return res.status(400).json({ success: false, message: 'User not found' })
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: " Internal Server Error"
        })
    }
})

module.exports = route