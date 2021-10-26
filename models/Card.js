const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    desciption: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "list"
    }
},{
    timestamps:true
})

const Card = mongoose.model("card", CardSchema);

module.exports = Card;