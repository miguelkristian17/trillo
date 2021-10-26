const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true,
        default: 0
    },
    board:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "board"
    }
},{
    timestamps:true
})