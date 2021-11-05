const express = require("express");
const router = express.Router();
const {validationResult, check} = require("express-validator")
const Board = require("../models/Board")
const User = require("../models/User")
const auth = require("../middleware/auth")

router.get("/", async (req, res) => {
    Board.find((err, boards) => {
        if(err){
            res.send(400).json({msg: err})
        } else {
        res.json(boards)
        }
    })
})

router.post("/", 
[
    auth,[
        check("name", "Name is required").not().isEmpty()
    ]
], async (req, res) => {

    // Check for errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    // Create new board
    try {
        const user = await User.findById(req.user.id).select('-password')

        const newBoard = new Board({
            name: req.body.name,
            user: user.id
        })
        const board = await newBoard.save()
        res.json(board)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

// Delete board by id
router.delete("board_:id", auth, async (req, res) => {
    try {
        const board = await Board.findById(req.params.id)
        if(!board) res.status(404).json({msg: "Board not found"})
        
            if (board.user.toString() !== req.user.id){
                return res.status(401).json({msg: "User not authorized"})
            }

            await board.remove()
            res.json({msg: "Board removed"})
    } catch (err) {
        console.error(err.message)
        if(err.kind === "ObjectId"){
            return res.status(404).json({msg: "Board not found"})
        }
        res.status(500).send("Server Error")
    }
})



module.exports = router
