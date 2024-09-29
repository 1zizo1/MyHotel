import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
}
  from "react-router-dom";
import Layout from "./layouts/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/Search" element={<>Search Page</>} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Route>
      </Routes>

    </Router>
  );
};
export default App;