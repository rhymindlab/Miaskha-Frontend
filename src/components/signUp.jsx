import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  X,
  Mail,
  Lock,
  User,
} from "lucide-react";

import { signupUser } from "../lib/User";
import useAuth from "../hooks/useAuth";

export default function Signup({
  showSignup,
  setShowSignup,
}) {
  const navigate = useNavigate();

  const { setLoggedIn, setUser, setShowLogin } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsandCondtions: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!showSignup) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!formData.termsandCondtions) {
      alert("Please accept Terms & Conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    

    try {
      setLoading(true);

      const user = await signupUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        termsandCondtions: formData.termsandCondtions,
        setLoggedIn,
        setUser,
        setShowSignup,
      });

      if (user) {
        navigate("/account", {
          state: {
              tab: "Addresses",
              address: "Billing Address",
          },
        });
      }

    } catch (err) {
      console.error(err);
      alert(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">

        <div className="h-2 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>

        <button
          onClick={() => setShowSignup(false)}
          className="absolute top-5 right-5 text-gray-500 hover:text-black transition"
        >
          <X size={24} />
        </button>

        <div className="px-10 py-10">

          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="MIASHKA"
              className="h-20 object-contain"
            />
          </div>

          <h2 className="text-3xl font-serif font-semibold text-center">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Join MIASHKA Diamonds
          </p>

          {/* First Name + Last Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">

            <div className="relative">
              <User
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-yellow-600"
              />
            </div>

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-600"
            />

          </div>

          {/* Email */}
          <div className="relative mb-4">

            <Mail
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-yellow-600"
            />

          </div>

          {/* Password */}
          <div className="relative mb-4">

            <Lock
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-yellow-600"
            />

            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Confirm Password */}
          <div className="relative mb-5">

            <Lock
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-yellow-600"
            />

            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 mb-6 text-sm text-gray-600 cursor-pointer">

            <input
              type="checkbox"
              checked={formData.termsandCondtions}
              onChange={(e) => 
                setFormData({
                  ...formData,
                  termsandCondtions: e.target.checked,
                })
              }
              className="mt-1"
            />

            <span>
              I agree to the
              <button
                type="button"
                className="text-yellow-700 font-medium ml-1 hover:underline"
              >
                Terms & Conditions
              </button>
            </span>

          </label>

          {/* Submit */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-black hover:bg-yellow-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login */}
          <p className="text-center mt-8 text-gray-500">
            Already have an account?

            <button
              onClick={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
              className="ml-2 text-yellow-700 font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}