import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./routing/RequireAuth";
import "./App.css";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import HomeLayout from "./layouts/HomeLayout";
import Interviews from "./pages/Interviews";

function App() {
  return (
    <Router>
      <div className="App font-inter h-screen">
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
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
