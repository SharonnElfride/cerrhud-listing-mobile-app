import { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navigation/Navbar";
import RenderRoutes from "./components/routing/RenderRoutes";
import { appRoutes } from "./navigation/app_routes";

function App() {
  const location = useLocation();
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    const pathname = location.pathname;
    let currentRoute = appRoutes.find((r) => r.path === pathname);

    if (!currentRoute) {
      currentRoute = appRoutes.find((r) => {
        if (r.path.includes("/:")) {
          const basePath = r.path.split("/:")[0];
          return pathname.startsWith(basePath);
        }
        return false;
      });
    }

    // const hideNavbar = ["auth", "public"].includes(currentRoute?.type ?? "");
    setHideNavbar(currentRoute?.hideNavbar ?? false);
  }, [location]);

  return (
    <div className="min-h-screen bg-muted flex flex-col animate-in overflow-x-hidden">
      {!hideNavbar && <Navbar />}
      <main className="grow">
        <Routes>{RenderRoutes(appRoutes)}</Routes>
      </main>
    </div>
  );
}

export default App;
