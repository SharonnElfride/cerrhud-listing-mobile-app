import { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navigation/Navbar";
import RenderRoutes from "./components/routing/RenderRoutes";
import { appRoutes } from "./navigation/app_routes";
import { findCurrentRoute } from "./navigation/find_current_route";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { pathname } = useLocation();
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    let currentRoute = findCurrentRoute(appRoutes, pathname);
    setHideNavbar(currentRoute?.hideNavbar ?? false);
  }, [pathname]);

  return (
    <div
      className={`min-h-screen bg-muted flex animate-in overflow-x-hidden gap-2 ${
        hideNavbar ? "" : "p-2"
      }`}
    >
      {!hideNavbar && <Navbar />}
      <main className="min-w-4/5 grow bg-routes-bg shadow rounded-md">
        <Routes>{RenderRoutes(appRoutes)}</Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
