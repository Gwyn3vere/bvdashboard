import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import privateRoutes from "./routes/privateRoutes";
import publicRoutes from "./routes/publicRoutes";
import NotFound from "./pages/NotFound";
import { ProtectedRoute, PublicRoute } from "./components/auth";
import "./styles/global.css";

function App() {
  const renderRoutes = (routes, isPrivate = false) => {
    return routes.map(({ path, component: Component, layout: Layout = Fragment }, index) => {
      const element = (
        <Layout>
          <Component />
        </Layout>
      );

      return (
        <Route
          key={index}
          path={path}
          element={isPrivate ? <ProtectedRoute>{element}</ProtectedRoute> : <PublicRoute>{element}</PublicRoute>}
        />
      );
    });
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          {renderRoutes(publicRoutes)}
          {renderRoutes(privateRoutes, true)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
