const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const baiDangSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image_posts: {
        type: String,
    },
    isdeleted: {
        type: Boolean,
        default: false
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accounts'
    }],
    speciesId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'loaibaidangs'
    }],
    deleteAt: { type: Date, default: null },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: null },

}, {
    timestamps: false,
})
module.exports = mongoose.model('baidangs', baiDangSchema)