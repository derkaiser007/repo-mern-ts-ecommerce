import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [login] = useLoginMutation();

    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
    

    

    

    return(
        <div className="login">
            <main>
              <h1 className="heading">Login</h1>   

              <div>
                {!isAuthenticated ? (
                  <>
                  <div>
                    Username:
                    <input
                      type="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />                    
                  </div>
                  <div>
                    Password:
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    /> 
                  </div>
                  <button onClick={() => loginWithRedirect()}>Log In</button>
                  </>
                ) : (
                  <>
                  <div>
                  <img src={user?.picture} alt={user?.name} />
                  <h2>{user?.name}</h2>
                  <p>{user?.email}</p>
                  </div>
                  <button onClick={() => logout({logoutParams: { returnTo: window.location.origin }})}>Log Out</button>
                  </>
                )}
              </div>

            </main>
          </div>      
    )
}

export default Login;