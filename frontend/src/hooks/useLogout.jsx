import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout =()=>{
    const { dispatch } = useAuthContext();
    const { dispatch : workoutDispatch } = useWorkoutContext();

      const logout=()=>{
    //    remove from localStorage
    localStorage.removeItem('user')
    // change the global context 
    dispatch({ type: 'LOGOUT'})
    workoutDispatch({ type: 'SET_WORKOUTS', payload:null})

      }
      return { logout };
}