
const Account = require('../model/account')
const hashPasswordByArgon2 = require('argon2')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


class accountController {

    //@method POST [REGISTER Acount]
    async createAcount(req, res, next) {

        const { username, email, password } = req.body

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền username."
            })
        }
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền Email."
            })
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền Password."
            })
        }
        try {
            const checkusername = await Account.findOne({ username: username })
            if (checkusername) {
                return res.status(400).json({
                    success: false,
                    message: "username này đã tồn tại."
                })
            }
            const checkemail = await Account.findOne({ email: email })
            if (checkemail) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng nhập Email khác."
                })
            }
            const hashPassword = await hashPasswordByArgon2.hash(password)
            //const token = jwt.sign({ userId: checkemail }, process.env.TOKEN_SECRET)

            // confirm Account with Email
            // const msg = {
            //     to: email, // Change to your recipient
            //     from: process.env.EMAIL, // Change to your verified sender
            //     subject: 'Hi Guy. Welcome to Blogdev.',
            //     text: 'Please Confirm account with us.',
            //     html: '<strong> `Hello, \n\n' + 'Please verify your account by clicking the link: \nhttp: \/\/' + req.headers.host + '\/confirmation\/' + token + '.\n`</strong > ',
            // }
            // sgMail
            //     .send(msg)
            //     .then(() => {
            //         console.log('Email sent')
            //     })

            const newAcount = new Account({
                username: username,
                email: email,
                password: hashPassword,
                avata: req.file.path
            })
            const acount = await newAcount.save()
            return res.status(200).json({
                success: true,
                data: acount,
                message: `Thành công.`,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }

    };

    //@method POST [Login Acount]
    async loginPage(req, res, next) {
        const { email, password } = req.body
        if (!email) {
            return res.status(401).json({
                success: false,
                message: "Vui lòng nhập Email."
            })
        }
        if (!password) {
            return res.status(401).json({
                success: false,
                message: "Vui lòng nhập Mật khẩu."
            })
        }
        try {
            const user = await Account.findOne({ email })    //check account users
            if (!user) {
                return res.status(401).json({
                    success: false,
                    data: null,
                    message: 'Email hoặc Mật khẩu sai.'
                })
            }
            const passwordValidate = await hashPasswordByArgon2.verify(user.password, password)
            if (!passwordValidate) {
                return res.status(401).json({
                    success: false,
                    message: 'Email hoặc Mật khẩu sai.'
                })
            }
            if (user.roles !== 'admin') {              // check lock account 
                return res.status(401).json({
                    success: false,
                    message: 'Chỉ admin mới có quyền login.'
                })
            }
            else if (user.active === false) {              // check actived account
                return res.status(401).json({
                    success: false,
                    message: 'Tài khoản chưa được kích hoạt.'
                })
            }
            else {
                const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET)// , { expiresIn: process.env.TOKEN_LIFE }
                user.token = token
                const acount = await user.save()
                return res.json({
                    success: true,
                    role: acount.roles,
                    token: token,
                    message: 'Đăng nhập thành công'
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    };

    // @method PATCH [UPDATE PASSWORD USER] 
    async updatePassword(req, res) {
        const { oldPassword, newPassword } = req.body
        if (!oldPassword) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng nhập mật khẩu cũ.'
            })
        }
        if (!newPassword) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng nhập mật khẩu mới.'
            })
        }
        if (oldPassword === newPassword) {
            return res.status(401).json({
                success: false,
                message: 'Trùng mật khẩu cũ, vui lòng thử lại.'
            })
        }
        try {
            const acount = await Account.findOne({ _id: req.userId })
            // check match password
            const verifyPassword = await hashPasswordByArgon2.verify(acount.password, oldPassword)
            if (verifyPassword) {
                const hassNewPassword = await hashPasswordByArgon2.hash(newPassword)
                await Account.findOneAndUpdate({ _id: req.userId }, { password: hassNewPassword }, { new: true })
                return res.status(200).json({
                    success: true,
                    message: 'Cập nhật thành công.'
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Mật khẩu cũ không đúng.'
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }
    };

    //@ method PUT -> [ UPDATE ACOUNT USER]
    async updateAcount(req, res) {
        const {
            username,
            descreption,
            avata
        } = req.body
        // required
        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền username."
            })
        }
        try {
            let newdataAcount = {
                username: username,
                descreption: descreption,
                avata: avata
            }
            const checkusername = await Account.findOne({ username: username })
            if (checkusername) {
                return res.status(400).json({
                    success: false,
                    message: "username này đã tồn tại, vui lòng thử lại."
                })
            }
            const result = await Account.findOneAndUpdate({ _id: req.userId }, newdataAcount, { new: true })
            if (!result) {
                return res.status(401).json({
                    success: false,
                    message: "Posts not found with authorised.!!!"
                })
            } else {
                return res.status(500).json({
                    success: true,
                    data: result,
                    message: "Cập nhật thành công."
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

}
module.exports = new accountController