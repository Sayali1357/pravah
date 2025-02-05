const mongoose = require('mongoose');
const Schema = mongoose.SchemaType;

const Taskscheme = new Schema({
    taskName: {
        type: String,
        required:true
    },
    isDone: {
        type:Boolean,
        required:true
    }
});

const TaskModel = mongoose.model('todos',TaskScheme);
module.export = Taskscheme;