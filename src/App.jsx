import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import privateRoutes from "./routes/privateRoutes";
import publicRoutes from "./routes/publicRoutes";
import NotFound from "./pages/NotFound";
// Global styles - tailwindcss
import "./styles/global.css";

function App() {
  const renderRoutes = (routes) => {
    return routes.map(({ path, component: Component, layout: Layout = Fragment }, index) => {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
        />
      );
    });
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* public routes */}
          {renderRoutes(publicRoutes)}

          {/* private routes */}
          {renderRoutes(privateRoutes)}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
