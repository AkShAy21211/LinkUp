import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user, signUpUser } = useAuth();
  const navigate = useNavigate();

  // Redirect to home page if user is already authenticated
  if (user) {
    return <Navigate to={"/"} />;
  }

  /** 
    This function handles the form submission. It first checks if the name, email, password, and confirmPassword fields are filled out.
    Then, it checks if the email is in a valid format using a regular expression.
    If any of these checks fail, it sets an error message and returns early.
    If all checks pass, it attempts to sign up the user using the signUp function from the authService.
    If the sign up is successful, it redirects the user to the sign in page.
    If there's an error during the sign up process, it sets the error message accordingly.
    The form submission is prevented by default to prevent the page from reloading.
  */

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError(null);

    if (!name) {
      setError("Please enter a name");
      return;
    }
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email");
    }

    if (!password || !confirmPassword || password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = await signUpUser(email, password, name);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center bg-auth-bg justify-center min-h-screen bg-gray-100 text-white">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">LinkUp</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4 ">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-transparent"
              required
            />
          </div>

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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/sign-in" className="hover:underline">
            SignIn
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
