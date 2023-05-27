const { default: mongoose } = require('mongoose');
const Workout = require('../models/WorkOutModel');


const workout = async ( req,res )=>{
    const user_id = req.user._id
    console.log(user_id)
    const getworkout = await Workout.find({ user_id}).sort({ createdAt: -1})
    res.status(201).json(getworkout)
    }

const workout_single= async ( req,res )=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"No Workout Found"});
    }else{
        const oneWorkout = await Workout.findById(id)
        if(!oneWorkout){
        return res.status(403).json({message:"No Workout Found!"})
        }
        res.status(201).json(oneWorkout)
    }
}

const workout_post= async ( req,res )=>{
    const { title,reps,load } = req.body;

    let emptyFields = []

    if(!title){
      emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
      }
    if(!reps){
        emptyFields.push('reps')
      }
    if( emptyFields > 0){
        res.status(400).json({error:'Please fill in the fields', emptyFields})
    }

    // Send to the DB
   try{
      const user_id = req.user._id;
      const workoutRES = await Workout.create({ title,reps,load, user_id})
      res.status(200).json(workoutRES)
   }
   catch(error){
      res.status(400).json({error:error.message})
   }       
}

const workout_delete= async ( req,res )=>{
   const { id } = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({message:"No Workout Found"});
   }
   const workoutDEL = await Workout.findOneAndDelete({_id: id})
   if(!workoutDEL){
    return res.status(403).json({message:"No Workout Found!"})
   }
   res.status(201).json(workoutDEL);
}

const workout_update= async ( req,res )=>{
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({message:"No Workout Found"});
   }
   const workoutUPD = await Workout.findOneAndUpdate({_id: id},{...req.body})
   if(!workoutUPD){
    return res.status(403).json({message:"No Workout Found!"})
   }
   res.status(201).json(workoutUPD);

}



module.exports = {
    workout, workout_single ,workout_post ,workout_delete ,workout_update
}