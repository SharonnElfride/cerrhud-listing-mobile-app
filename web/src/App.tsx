import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRoute from "./components/routing/AuthRoute";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import { appRoutes } from "./navigation/app_routes";

function App() {
  return (
    <div className="min-h-screen flex flex-col animate-in overflow-x-hidden">
      <main className="grow">
        <Routes>
          {appRoutes.map((rte) => {
            const Element = <rte.route />;

            return (
              <Route
                key={rte.path}
                index={rte.path === "/"}
                path={rte.path}
                element={
                  rte.type === "auth" ? (
                    <AuthRoute redirectTo={rte.redirectTo}>{Element}</AuthRoute>
                  ) : rte.type === "protected" ? (
                    <ProtectedRoute route={rte}>{Element}</ProtectedRoute>
                  ) : (
                    Element
                  )
                }
              />
            );
          })}
        </Routes>
      </main>
    </div>
  );
}

export default App;
