import { useState } from "react";
import bgImage from "../assets/backgrounds/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg";
import { authService } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    if (!username || !password || !email) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await authService.register({ username, password, email });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Registration failed, user might already exist");
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="relative flex w-full flex-col justify-center gap-y-8 px-12 sm:mx-auto sm:basis-[500px] sm:px-0 lg:basis-[560px] lg:px-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </h2>
          <h4 className="font-normal mb-6 text-center text-gray-800">
            Register to get started
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-700"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-700"
            />
            <button
              onClick={handleRegister}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Register
            </button>
            {error && (
              <p className="text-red-600 text-center text-sm mt-2">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-center text-sm mt-2">
                Registration successful! Redirecting to login...
              </p>
            )}
            <div className="text-center mt-4">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-primary-600 hover:text-primary-800 font-semibold">
                Login
              </Link>
            </div>
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

export default Register;
