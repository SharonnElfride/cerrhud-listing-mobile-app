import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <div className="min-h-screen flex flex-col animate-in overflow-x-hidden">
      <main className="grow">
        <Routes>
          <Route path={"/"} element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRoles={["admin", "super_admin"]}>
                <div>Admin Page</div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super"
            element={
              <ProtectedRoute requiredRoles={["super_admin"]}>
                <div>Super Admin Panel</div>
              </ProtectedRoute>
            }
          />

          {/* 
            <Route path={"/medical-tests"} element={<MedicalTests />} />
            <Route path={"/medical-tests/:id"} element={<MedicalTests />} />
            <Route path={"/users"} element={<MedicalTests />} />
            <Route path={"/users/:id"} element={<MedicalTests />} />
            <Route path={"/profile OR /profile/:id"} element={<MedicalTests />} />
          */}

          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
