import "./App.css";
import Home from "./pages/home/Home";
import Auth from "./pages/Auth/Auth2";
import Profile from "./pages/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminAuth from "./pages/AdminAuth/AdminAuth";
import Chat from "./pages/Chat/Chat";
import Saved from "./pages/Saved/Saved";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

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
          element={user? <Home /> : <Login />}
        />
        <Route path="/signup" element={<SignUp />} />


        <Route
          path="/signup"
          element={user? <Home /> : <SignUp />}
        />
        <Route
          path="/login"
          element={user? <Home /> : <Login />}
        />
        <Route
          path="home"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
        <Route
          path="saved"
          element={user ? <Saved /> : <Navigate to="../login" />}
        />

        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../login" />}
        />

        <Route
          path="/admin"
          element={
            admin ? <AdminHome/>  : <AdminAuth />
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

      </Routes>
    </div>
  );
}

export default App;
