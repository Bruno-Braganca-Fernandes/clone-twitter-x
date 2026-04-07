import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Feed } from "./pages/Feed";
import { AuthProvider } from "./contexts/AuthContext";
import { Explore } from "./pages/Explore";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
