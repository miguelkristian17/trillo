const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true,
    },
    board:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "board"
    }
},{
    timestamps:true
})

const List = mongoose.model('list', ListSchema);
module.exports = List;
