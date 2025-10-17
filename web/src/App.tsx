import { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navigation/Navbar";
import RenderRoutes from "./components/routing/RenderRoutes";
import { appRoutes } from "./navigation/app_routes";
import { findCurrentRoute } from "./navigation/find_current_route";

function App() {
  const { pathname } = useLocation();
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    let currentRoute = findCurrentRoute(appRoutes, pathname);
    setHideNavbar(currentRoute?.hideNavbar ?? false);
  }, [pathname]);

  return (
    <div
      className={`bg-muted flex animate-in overflow-x-hidden gap-2 ${
        hideNavbar ? "" : "p-2"
      }`}
    >
      {!hideNavbar && <Navbar />}
      <main className="grow bg-routes-bg shadow rounded-xl">
        <Routes>{RenderRoutes(appRoutes)}</Routes>
      </main>
    </div>
  );
}

export default App;
