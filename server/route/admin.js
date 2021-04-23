const express = require('express')
const adminController = require('../controller/adminController')
const route = express.Router()
const auth = require('../middleware/auth')


const multer = require('multer')

const storage = multer.diskStorage({
    // nơi file được lưu lại 
    destination: function (req, file, callback) {
        callback(null, './upload');
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
        let fileName = `${Date.now()}-trungdev-${file.originalname}`;
        callback(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
})

route.get('/', adminController.homePosts)
route.get('/post-by-species/:id', adminController.postsBySpecies)
// @POSTS 
route.post('/create-post', auth, upload.single('image_posts'), adminController.createPost)
route.put('/update-post/:id', auth, adminController.updatePosts)
route.put('/delete-post/:id', auth, adminController.deletePosts)

// @SPECIES
route.post('/postspecies', auth, adminController.createPostSpecies)
route.get('/postspecies', adminController.getpostspecies)

// @POST BY USER
route.get('/post-by-account/:id', auth, adminController.loadPostsById)

// @ DELETE FOREVER POSTS
route.delete('/destroy-post/:id', auth, adminController.destroyPosts)



module.exports = route