import { useState } from "react"
import { useSignUp } from "../hooks/useSignUp"


const SignUp = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const { signup, isLoading ,error } = useSignUp();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        await signup(email,password)
    }

    return ( 
             <>
             <form action="" className="signup" onSubmit={handleSubmit}>
                <h3>SignUp Page:</h3>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" 
                onChange={(e)=>setEmail(e.target.value)} 
                value={email} />

                <label htmlFor="pass">Password:</label>
                <input type="password" id="password" name="password"
                onChange={(e)=>setPassword(e.target.value)} 
                value={password} />
                <button disabled={isLoading}>SignUp</button>
                {error && <div className="error">{error}</div> }
             </form>
             
             </>
     );
}
 
export default SignUp;