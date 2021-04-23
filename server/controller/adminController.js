
const User = require('../model/account')
const Posts = require('../model/baidangs')
const PostSpecies = require('../model/loaibaidangs')

class adminController {
    async destroyPosts(req, res) {
        const idAccount = req.params.id
        try {
            const checkRole = await User.findOne({ _id: req.userId })
            if (checkRole.roles !== 'admin') {
                return res.status(400).json({
                    success: false,
                    message: 'Chỉ admin mới có quyền này.'
                })
            } else {
                const destroy = await Posts.deleteOne({ _id: idAccount })
                if (destroy) {
                    return res.status(200).json({
                        success: true,
                        message: 'Xác nhận đã xóa thành công.'
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        message: 'Xóa không thành công.'
                    })
                }
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    };

    // Get POST
    async homePosts(req, res) {
        try {
            const posts = await Post.find()
            return res.status(200).json({
                success: true,
                data: posts,
                message: "Load danh sách bài đăng thành công."

            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    // Create POST 
    async createPost(req, res) {

        const { title,
            description,
            speciesId,

        } = req.body

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền Tiêu đề bài đăng."
            })
        }
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền nội dung bài đăng."
            })
        }
        try {
            const newPost = new Posts({
                title,
                description,
                userId: req.userId,
                image_posts: req.file.path
            })
            const data = await newPost.save()

            const species = await PostSpecies.findOne({ _id: speciesId })
            if (!species) {
                return res.status(401).json({
                    success: false,
                    message: "Chưa chọn loại bài đăng?"
                })
            }
            data.speciesId.push(speciesId)
            await data.save()
            return res.status(200).json({
                success: true,
                data: data,
                message: "Thành công."
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    // PUT POSTS
    async updatePosts(req, res) {
        const { title, description, image_posts } = req.body
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền Tiêu đề Bài đăng."
            })
        }
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng thêm nội dung bài đăng."
            })
        }
        try {
            let updatedPost = {
                title,
                description: description || '',
                image_posts: req.file.path,
                IdLoaibaidang
            }
            const postsUpdateCondition = { _id: req.params.id, userId: req.userId }
            updatedPost = await Post.findOneAndUpdate(postsUpdateCondition, updatedPost, { new: true })

            //check user , user authorised to update 
            if (!updatedPost) {
                return res.status(401).json({
                    success: false,
                    message: "Posts not found with authorised.!!!"
                })
            }
            return res.status(200).json({
                success: true,
                data: updatedPost,
                message: "Cập nhật bài đăng thành công."
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    // DELETE POSTS
    async deletePosts(req, res) {
        try {
            let deletePost = await Posts.findOneAndUpdate(
                { _id: req.params.id, userId: req.userId },
                { isdeleted: true, },
                { new: true }
            )
            //check user , user authorised to delete 
            if (!deletePost) {
                return res.status(401).json({
                    success: false,
                    message: "Posts not found with authorised"
                })
            }
            return res.status(200).json({
                success: true,
                message: "Xóa bài đăng thành công."
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    // POST createPostSpecies
    async createPostSpecies(req, res) {
        const { species, description } = req.body
        if (!species) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền tên loại bài đăng."
            })
        }
        try {
            const checkRole = await User.findOne({ _id: req.userId })
            if (checkRole.roles !== 'admin') {
                return res.status(400).json({
                    success: false,
                    message: 'Bạn không có quyền thêm loại.'
                })
            }
            else {
                const postSpecies = new PostSpecies({
                    species,
                    description,
                    user: req.userId
                })

                const data = await postSpecies.save()
                return res.status(200).json({
                    success: true,
                    data: data,
                    message: "Thêm thành công."
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
    async getpostspecies(req, res) {
        const { speciesId } = req.body
        const data = await PostSpecies.findOne({})
    };
    // LOAD BÀI ĐĂNG THEO NGƯỜI ĐĂNG
    async loadPostsById(req, res, next) {
        try {
            const result = await Posts.findOne({ userId: req.userId })
            if (!result) {
                return res.status(200).json({
                    success: true,
                    data: null,
                    message: 'Bạn chưa có bài đăng nào.'
                })
            } else {
                return res.status(200).json({
                    success: true,
                    data: result,
                    message: 'Tải bài đăng thành công.'
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
    // TẢI BÀI ĐĂNG THEO LOẠI
    async postsBySpecies(req, res) {
        try {
            const data = await Posts.find({ speciesId: req.params.id })
            if (data) {
                return res.status(200).json({
                    success: true,
                    data: data,
                    message: 'Tải bài đăng thành công'
                })
            } else {
                return res.status(401).json({
                    success: false,
                    data: null,
                    message: 'Tải bài đăng thất bại'
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                data: null,
                message: error.message
            })
        }
    };


}

module.exports = new adminController