import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import StarterPage from "./Pages/StarterPage";
import {Routes, Route} from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/starter" element={<StarterPage />} />
    </Routes>
  );
};
export default App;