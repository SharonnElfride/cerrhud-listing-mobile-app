import { Users } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MedicalTests from "./pages/MedicalTests";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <div className="min-h-screen flex flex-col animate-in overflow-x-hidden">
      <main className="grow">
        <Routes>
          <Route path={"/"} element={<Login />} />

          <Route
            path={"/dashboard"}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path={"/medical-tests"}
            element={
              <ProtectedRoute requiredRoles={["user", "admin", "super_admin"]}>
                <MedicalTests />
              </ProtectedRoute>
            }
          />

          <Route
            path={"/users"}
            element={
              <ProtectedRoute requiredRoles={["admin", "super_admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route path={"/profile"} element={<Profile />} />
          {/* <Route path={"/profile OR /profile/:id"} element={<Profile />} /> */}

          {/* 
            <Route path={"/medical-tests/:id"} element={<MedicalTests />} />
            <Route path={"/users/:id"} element={<MedicalTests />} />
          */}

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
/*
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";

    <QueryClientProvider client={queryClient}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col select-none animate-fade-in-scale overflow-x-hidden"
        >
          <PageTitleSetter />
          <Navbar />
          <main className="grow">
            <Routes>
        // {AllNavigationItems.map((item) => (
          <Route path={"/"} element={<Login />} />
          <Route path={"/dashboard"} element={<MedicalTests />} />
          <Route path={"/medical-tests"} element={<MedicalTests />} />
          <Route path={"/medical-tests/:id"} element={<MedicalTests />} />
          <Route path={"/users"} element={<MedicalTests />} />
          <Route path={"/users/:id"} element={<MedicalTests />} />
          <Route path={"/profile OR /profile/:id"} element={<MedicalTests />} />
          // <Route path={item.url} element={<item.route />} />
        // ))}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
          </main>
        </motion.div>
    </QueryClientProvider>
*/

export default App;
