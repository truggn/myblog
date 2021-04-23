const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const accountSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    avata: {
        type: String
    },
    descreption: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false

    },
    roles: {
        type: String,
        default: 'user'
    },
    token: {
        type: String
    },
    deleteAt: { type: Date, default: null },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: null },

}, { timestamps: false })
module.exports = mongoose.model('account', accountSchema)