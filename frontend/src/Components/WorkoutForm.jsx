import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useState } from "react";


const WorkoutForm = () => {
    const [ title,setTitle ] = useState('');
    const [ load,setLoad ] = useState('');
    const [ reps,setReps] = useState('');
    const [ error,setError ] = useState(null);
    const [ emptyFields,setEmptyFields ] = useState([]);
    const { dispatch } = useWorkoutContext();
    const { user } = useAuthContext()
    
    const handleSubmit= async (e)=>{
        e.preventDefault();

        if(!user){
           setError('You must be logged in!')
            return
        }

        const workout = { title,load,reps}
     const response = await fetch('http://localhost:9000/workout/', {
        method: 'POST',
        headers: {'Content-Type': "application/json",
                 'Authorization': `Bearer ${user.token}`
                  },
        body: JSON.stringify(workout)
     })
     
     const json = await response.json()
     
     if(!response.ok){
      setError(json.error)
      setEmptyFields(json.emptyFields)
     }

     if(response.ok){
        setError(null)
        setEmptyFields([])
        dispatch({type:'CREATE_WORKOUT', payload:json})
        console.log('Response Sent Successfully',json)
        setTitle('')
        setLoad('')
        setReps('')
     }

    }

    return ( 
            <>
            <form  className="create" onSubmit={handleSubmit}>
                <h3>Add a New Workout</h3>

                <label htmlFor="title">Exercise Title :</label>
                <input type="text" id="title"
                 onChange={(e)=>{setTitle(e.target.value)}}
                  value={title}
                  className={emptyFields.includes('title') ? 'error' : ''}/>

                <label htmlFor="load">Load (kg):</label>
                <input type="text" id="load"
                 onChange={(e)=>{setLoad(e.target.value)}}
                  value={load}
                  className={emptyFields.includes('load') ? 'error' : ''}/>

                <label htmlFor="reps">Reps:</label>
                <input type="text" id="reps"
                 onChange={(e)=>{setReps(e.target.value)}}
                  value={reps}
                  className={emptyFields.includes('reps') ? 'error' : ''}/>
                <button>Add Workout</button>
            </form>
            { error && <div className="error">{error}</div> }
            </>
     );
}
 
export default WorkoutForm;