const express = require("express");
const router = express.Router();
const {validationResult, check} = require("express-validator")
const Card = require("../models/Card");
const List = require("../models/List");
const Board = require("../models/Board")
const User = require("../models/User")
const auth = require("../middleware/auth")

// @route   GET api/cards
// @desc    Get all cards by list id
// @access  Private
router.get("/:list_id", auth, async (req, res) => {
    try {
        const cards = await Card.find({list: req.params.list_id})

        if (!cards) {
            return res.status(400).json({msg: "No cards found"})
        }

        res.json(cards)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

// @route   POST api/cards
// @desc    Create a card
// @access  Private

// create a rouse for the card to be added to a list 
router.post("/:list_id", auth, async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const list = await List.findById(req.params.list_id)
        const cards = await Card.find({list: req.params.list_id})
        const newCard = new Card({
            title: req.body.title,
            list: list.id,
            order: cards.length + 1
        })
        const card = await newCard.save()

        res.json(card)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}
)

module.exports = router;