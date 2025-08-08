import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./routing/RequireAuth";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
