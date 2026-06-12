import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import StarterPage from "./Pages/StarterPage";
import AuthSuccess from "./Pages/AuthSuccess";
import {Routes, Route} from "react-router-dom";
import ProtectedRoute from "./serivce/ProtectedRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/starter" element={<ProtectedRoute><StarterPage /></ProtectedRoute>} />
      <Route path="/auth-success" element={<AuthSuccess />} />
    </Routes>
  );
};
export default App;