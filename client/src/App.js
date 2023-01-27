import "./App.css";
import Home from "./pages/home/Home";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminAuth from "./pages/AdminAuth/AdminAuth";
import Chat from "./pages/Chat/Chat";
import Saved from "./pages/Saved/Saved";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  const admin = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      <Routes>
        <Route
          path="/"
          element={user?.user?.verified? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="home"
          element={user? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="auth"
          element={user? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="chat"
          element={user? <Chat /> : <Navigate to="../auth" />}
        />
        <Route
          path="saved"
          element={user? <Saved /> : <Navigate to="../auth" />}
        />

        <Route
          path="/profile/:id"
          element={user? <Profile /> : <Navigate to="../auth" />}
        />

        <Route
          path="/"
          element={
            admin ? <Navigate to="adminhome" /> : <Navigate to="/admin" />
          }
        />

        <Route
          path="adminhome"
          element={admin ? <AdminHome /> : <Navigate to="../admin" />}
        />

        <Route
          path="/admin"
          element={admin ? <Navigate to="../adminhome" /> : <AdminAuth />}
        />
        <Route
          path="adminhome"
          element={admin ? <AdminHome /> : <Navigate to="../admin" />}
        />
      </Routes>
    </div>
  );
}

export default App;
