import { useState } from "react";
import { loginUser } from "../lib/User";
import useAuth from "../hooks/useAuth";


export default function Login({showLogin, setShowLogin, setShowSignup}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setLoggedIn, setUser, user} = useAuth();

    return(
        <>
            {showLogin && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 tansition-all">

                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative">

                    <button
                        onClick={() => setShowLogin(false)}
                        className="absolute top-4 right-4 text-xl"
                    >
                        ×
                    </button>

                    <h2 className="text-2xl font-bold mb-6">
                        Login
                    </h2>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 mb-4"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 mb-4"
                    />

                    <button className="w-full bg-black text-white py-3 rounded-xl" onClick={() => loginUser({email, password,setShowLogin,setLoggedIn,setUser,user})}>
                        Login
                    </button>

                    <p className="text-center mt-4 text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            className="font-semibold text-black hover:underline"
                            onClick={() => {
                            setShowLogin(false);
                            setShowSignup(true);
                            }}
                        >
                            Sign Up
                        </button>
                    </p>
                    </div>

                </div>
            )}

        </>
    )
}


