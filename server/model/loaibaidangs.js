const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loaiBaiSchema = new Schema({
    species: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'accounts'
    },
    isdeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })
module.exports = mongoose.model('loaibaidangs', loaiBaiSchema)