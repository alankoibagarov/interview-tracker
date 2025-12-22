import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./routing/RequireAuth";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import HomeLayout from "./layouts/HomeLayout";
import Interviews from "./pages/Interviews";
import Calendar from "./pages/Calendar";
import { useUserStore } from "./store/userStore";
import { authService } from "./services/authApi";
import { useEffect } from "react";

function App() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { user } = await authService.getUserData();
        setUser({
          username: user.username,
          email: user.email,
          themeDarkMode: user.themeDarkMode,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    if (localStorage.getItem("access_token")) {
      fetchUserData();
    }
  }, [setUser]);

  return (
    <Router>
      <div
        className={
          "App font-zalando h-screen" + `${user?.themeDarkMode ? " dark" : ""}`
        }
      >
        <main className="main-content h-screen">
          <Routes>
            <Route
              path="/"
              element={
                <HomeLayout>
                  <Home />
                </HomeLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/interviews"
              element={
                <RequireAuth>
                  <DashboardLayout>
                    <Interviews />
                  </DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/calendar"
              element={
                <RequireAuth>
                  <DashboardLayout>
                    <Calendar />
                  </DashboardLayout>
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
