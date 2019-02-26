const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {List, validateList} = require('../models/toDolist');
const {Users} = require('../models/users');

router.get('/', auth, async (req, res) => {
    const userID = req.user;
    const user = await Users.findById(userID);
    if(!user) return res.send('no user in db by that name');

    const list = await List.findOne({ 
        'userID': userID,
    });
    if(!list) return res.status(404).send("No list for the given user is found");
    
    res.send(list.items); 
});


router.put('/',auth , async (req, res) => {
    const userID = req.user;
    const user = await Users.findById(userID);
    if(!user) return res.send('no user in db by that name');

    const {error} = validateList(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const list = await List.findOneAndUpdate({ 'userID': userID }, {
        $push: {
            'items': req.body.item
        }
    }, {new: true});
    if(!list) return res.status(404).send("No list for the given user is found");

    res.send(list.items);
});

module.exports = router;
