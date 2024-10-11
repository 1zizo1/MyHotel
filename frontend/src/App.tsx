import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
}
  from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <p>HOme page</p>
          </Layout>
        } />
        <Route path="/Search" element={
          <Layout>
            <p>search page</p>
          </Layout>} />
        <Route path="/register" element={
          <Layout>
            <Register />
          </Layout>
        } />

        <Route path="/sign-in" element={
          <Layout>
            <SignIn />
          </Layout>
        } />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </Router>
  );
};
export default App;