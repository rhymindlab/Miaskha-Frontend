import { useState } from "react";

import useAuth from "../hooks/useAuth";
import { signupUser } from "../lib/User";

export default function Signup({ showSignup, setShowSignup, setShowLogin }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoggedIn, setUser } = useAuth();

  return (
    <>
      {showSignup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative">

            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-4 right-4 text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Sign Up
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mb-4"
            />

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
              className="w-full border rounded-xl px-4 py-3 mb-6"
            />

            <button
                className="w-full bg-black text-white py-3 rounded-xl"
                onClick={() =>
                    signupUser({
                    userName,
                    email,
                    password,
                    setShowSignup,
                    setLoggedIn,
                    setUser,
                    })
                }
                >
                Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
}