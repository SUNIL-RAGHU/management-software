
import input from "postcss/lib/input";
import { useRouter } from 'next/router'
import { ChangeEvent, FunctionComponent, useState } from "react";
import { trpc } from "~/utils/trpc";








interface LoginProps {
    
}
 
const Login: FunctionComponent<LoginProps> = () => {

    const router=useRouter()

    const[input,setInput]=useState({email:'',password:'',})

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target
        setInput((prev)=>({...prev,[name]:value}))
    }

    const { mutate: login, error,isError } = trpc.admin.Login.useMutation()

    return (<div className="flex h-screen  bg-gray-200 ">
    <div className="w-full max-w-xs m-auto bg-stone-50 rounded p-5">   
          <header>
            <img className="w-20 mx-auto mb-5" src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
          </header>   
          <form>
            <div>
              <label className="block mb-2 text-indigo-500" htmlFor="username">Username</label>
              <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" id="email-address" name='email' type="email" value={input.email} onChange={handleChange} autoComplete="email" required placeholder="Email address"></input>
            </div>
            <div>
              <label className="block mb-2 text-indigo-500" htmlFor="password">Password</label>
              <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" id='password'
                name='password'
                type='password'
                value={input.password}
                onChange={handleChange}
                autoComplete='current-password'
                placeholder="Password"
                required></input>
            </div>
            <div>          
              <button onClick={(e)=>{e.preventDefault()
              login(input)}} className="w-full  bg- bg-gray-200 hover:bg-pink-700 text-black font-bold py-5 px-4 mb-6 rounded" type="submit"></button>
            </div>       
          </form>  
          <footer>
            <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a>
            <a className="text-indigo-700 hover:text-pink-700 text-sm float-right" href="#">Create Account</a>
          </footer>   
        </div>
    </div>);
}
 
export default Login;