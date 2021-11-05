const express = require("express");
const router = express.Router();
const {validationResult, check} = require("express-validator")
const List = require("../models/List");
const Board = require("../models/Board")
const User = require("../models/User")
const auth = require("../middleware/auth")


// @route   GET api/lists from board
// @desc    Get all lists from board
// @access  Private
router.get("/:board_id", auth, async (req, res) => {

    try {
        const boardID = req.params.board_id;
        const lists = await List.find({board: boardID}).sort({order: 1});
    
        if(!lists) {
            return res.status(400).json({msg: "No lists found"});
        }
        res.json(lists);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);

router.post("/:board_id", auth, [
    check("name", "Name is required").not().isEmpty()
],async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name} = req.body;

    try {
        const boardId = req.params.board_id;
        const board = await Board.findById(boardId);

        if (!board) {
            return res.status(404).json({msg: "Board not found"});
        }
        const lists = await List.find({board: req.params.board_id}).sort({order: 1});

        const newList = new List({
            name,
            board: board.id,
            order: lists.length + 1
        });

        const list = await newList.save();
        res.json(list);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/lists/:board_id/:list_id
// @desc    Delete a list
// @access  Private
router.delete("/:board_id/:list_id", auth, async (req, res) => {
    try {
        const list = await List.findById(req.params.list_id);

        if (!list) {
            return res.status(404).json({msg: "List not found"});
        }

        if(list.board.toString() !== req.params.board_id){
            return res.status(401).json({msg: "Board not found"});
        }

        await list.remove();

        res.json({msg: "List removed"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router
