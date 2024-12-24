import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to home page if user is already authenticated

  if (user) {
    return <Navigate to={"/"} />;
  }

  /*
  function to handle user login with email and password after authenticated from firebase user data are 
  stored in the AuthContext to verify the authentication state of the user
   */

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      signInUser(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-auth-bg text-white bg-gray-100">
      <div className="w-full max-w-md p-8  bg-white/10 backdrop-blur-lg shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">LinkUp</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/sign-up" className=" hover:underline">
            SignUp
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
