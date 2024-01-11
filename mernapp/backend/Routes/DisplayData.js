const express = require('express');
const router = express.Router();

router.post("/foodData", (req, res) => {
    res.send([global.food_items, global.foodCategory]);
})

module.exports = router;