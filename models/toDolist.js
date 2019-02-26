const joi = require('joi');
const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true,
    }
});

const List = mongoose.model('lists', toDoListSchema);

function validateList(item){
    const schema = {
        item: joi.string().required()
    };
    return joi.validate(item, schema);
}


exports.toDoListSchema = toDoListSchema;
exports.List = List;
exports.validateList = validateList;
