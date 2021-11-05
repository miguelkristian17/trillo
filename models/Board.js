const mongoose = require('mongoose');

const BoardSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    background: {
        type: String
    }
},
    {
        timestamps: true
    }
);

const Board = mongoose.model("board", BoardSchema);

module.exports = Board;