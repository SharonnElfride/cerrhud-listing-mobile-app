import type { AppRoute } from "@/navigation/app_routes";
import { Route } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";

function RenderRoutes(routes: AppRoute[]): React.ReactNode {
  return routes.map((rte) => {
    const Element = <rte.route />;

    const element =
      rte.type === "auth" ? (
        <AuthRoute redirectTo={rte.redirectTo}>{Element}</AuthRoute>
      ) : rte.type === "protected" ? (
        <ProtectedRoute route={rte}>{Element}</ProtectedRoute>
      ) : (
        <div className="p-5">{Element}</div>
      );

    const routeKey =
      rte.path === "/"
        ? "index"
        : rte.path.substring(1).replace("/:", "-").replace("/", "-");

    return (
      <Route key={routeKey} path={rte.path} element={element}>
        {rte.children ? RenderRoutes(rte.children) : null}
      </Route>
    );
  });
}

export default RenderRoutes;
