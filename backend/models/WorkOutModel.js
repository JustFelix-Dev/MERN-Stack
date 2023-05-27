const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const workOutSchema = new Schema ({
    title:{
        type: String,
        required: true
    },
    reps:{
        type: Number,
        required: true
    },
    load :{
        type: Number,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
   
}, {timestamps: true} )

const Workout = mongoose.model('workout',workOutSchema);

module.exports = Workout;