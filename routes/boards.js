const express = require("express");
const router = express.Router();
const {validationResult, check} = require("express-validator")
const Board = require("../models/Board")
const User = require("../models/User")


router.get("/", async (req, res) => {
    Board.find((err, boards) => {
        if(err){
            res.send(400).json({msg: err})
        } else {
        res.json(boards)
        }
    })
})

// router.post("/", [,
//         check("name", "Name is required").not().isEmpty()
//     ], async (req, res) => {

//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()})
//     }

//     const {title} = req.body;

//     const boardField = {};
//     boardField.user = req.user.id;

//     if(title) boardField.title = title;

//     try {
//         board = new Board(boardFields)
//         await board.save();
//         res.json(board);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//     }
// })

module.exports = router;
