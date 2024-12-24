import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";

const App = () => (
  
  <Router>
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
