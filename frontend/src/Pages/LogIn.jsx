import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const LogIn = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const { login,error,isLoading } = useLogin()

    const handleSubmit= async(e)=>{
        e.preventDefault();

        await login(email,password);

    }

    return ( 
             <>
             <form action="" className="login" onSubmit={handleSubmit}>
                <h3>LogIn Page:</h3>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" 
                onChange={(e)=>setEmail(e.target.value)} 
                value={email} />

                <label htmlFor="pass">Password:</label>
                <input type="password" id="password" name="password"
                onChange={(e)=>setPassword(e.target.value)} 
                value={password} />
                 <button disabled={isLoading}>Log-in</button>
                {error && <div className="error">{error}</div> }
             </form>
             
             </>
     );
}
 
export default LogIn;