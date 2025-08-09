import { useState } from "react";
import bgImage from "../assets/backgrounds/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Simulate login logic
      if (username === "admin" && password === "password") {
        // Redirect or perform login success actions
        console.log("Login successful");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed");
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="relative flex w-full flex-col justify-center gap-y-8 px-12 sm:mx-auto sm:basis-[500px] sm:px-0 lg:basis-[560px] lg:px-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Welcome
          </h2>
          <h4 className="font-normal mb-6 text-center text-gray-800">
            Use your credentials to login
          </h4>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-700"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-700"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Login
            </button>
            {error && (
              <p className="text-red-600 text-center text-sm mt-2">{error}</p>
            )}
          </div>
        </div>
      </div>
      <div
        className="relative hidden lg:block lg:flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <img
          width="1920"
          height="1080"
          alt="Open books on a table"
          className="h-screen w-full object-cover object-center"
          src={bgImage}
        ></img>
      </div>
    </div>
  );
};

export default Login;
