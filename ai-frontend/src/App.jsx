import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import StarterPage from "./Pages/StarterPage";
import AuthSuccess from "./Pages/AuthSuccess";
import {Routes, Route} from "react-router-dom";
import ProtectedRoute from "./serivce/ProtectedRoute";
import Sessions from "./Pages/Sessions";
import Dashboard from "./Pages/Dashboard"
import About from "./Pages/About"
import Questions from "./Pages/Questions"
import Feedback from "./Pages/Feedback";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth-success" element={<AuthSuccess />} />
      <Route path="/starter" element={<ProtectedRoute><StarterPage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/sessions" element={<ProtectedRoute><Sessions /></ProtectedRoute>} /> 
      <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      <Route path="/questions/:sessionId" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
      <Route path= "/feedback/:sessionId" element= {<ProtectedRoute><Feedback /></ProtectedRoute>} />
    </Routes>
  );
};
export default App;