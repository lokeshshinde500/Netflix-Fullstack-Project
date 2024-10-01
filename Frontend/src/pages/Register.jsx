import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        {
          email,
          username,
          password,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setEmail("");
      setPassword("");
      setUsername("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen w-full section-hero">
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to={"/"}>
            <img src="/netflix-logo.png" alt="logo" className="w-52" />
          </Link>
        </header>

        <div className="flex justify-center items-center mt-20 mx-3">
          <div className="w-full max-w-md p-2 space-y-6 bg-black/60 rounded-lg shadow-md">
            <h1 className="text-center text-white text-2xl font-bold mb-4">
              Sign Up
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="Enter email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="Enter username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="Enter password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700 transition"
                disabled={loading}
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </form>
            <div className="flex justify-between text-gray-400">
              <p> Already a member?</p>
              <Link to={"/login"} className="text-red-500 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
