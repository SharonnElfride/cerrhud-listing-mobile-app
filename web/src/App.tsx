import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { appRoutes } from "./navigation/app_routes";

function App() {
  return (
    <div className="min-h-screen flex flex-col animate-in overflow-x-hidden">
      <main className="grow">
        <Routes>
          {appRoutes.map((rte) => (
            <Route
              key={rte.path}
              index={rte.path === "/"}
              path={rte.path}
              element={
                rte.requiredRoles || rte.requiredPermissions ? (
                  <ProtectedRoute route={rte}>
                    <rte.route />
                  </ProtectedRoute>
                ) : (
                  <rte.route />
                )
              }
            />
          ))}
        </Routes>
      </main>
    </div>
  );
}

export default App;
