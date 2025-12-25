import { useState } from "react";
import bgImage from "../assets/backgrounds/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg";
import { authService } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { ResponseCodes } from "../services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await authService.login(username, password);
      if (res.statusCode === ResponseCodes.OK) {
        localStorage.setItem("access_token", res.access_token);
        setUser({
          username,
          email: res.email,
          themeDarkMode: res.themeDarkMode,
          role: res.role,
        });
        navigate("/interviews");
      }
    } catch {
      console.error("Login error:");
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="relative flex w-full flex-col justify-center gap-y-8 px-12 sm:mx-auto sm:basis-[500px] sm:px-0 lg:basis-[560px] lg:px-12">
        <div className="w-full max-w-md">
          <Link className="flex justify-center mb-4" title="Go back to Home page" to={"/"}>
            <img className="size-[50px]" src="src/assets/logo.svg" alt="Logo" />
          </Link>

          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Welcome
          </h2>
          <h4 className="font-normal mb-4 text-center text-gray-800">
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
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
            <div className="text-center mt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/register" className="text-primary-600 hover:text-primary-800 font-semibold">
                Sign up
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

export default Login;
