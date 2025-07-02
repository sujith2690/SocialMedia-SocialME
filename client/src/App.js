// import "./App.css";
// import Home from "./pages/home/Home";
// import Profile from "./pages/Profile/Profile";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import AdminHome from "./pages/AdminHome/AdminHome";
// import AdminAuth from "./pages/AdminAuth/AdminAuth";
// import Chat from "./pages/Chat/Chat";
// import Saved from "./pages/Saved/Saved";
// import ErrorPage from "./pages/Error/ErrorPage";
// import Login1 from "./pages/Login/Login1";
// import Signup1 from "./pages/SignUp/Signup1";

// function App() {
//   const user = useSelector((state) => state.authReducer.authData);
//   return (
//     <div className="App">
//       <div className="blur" style={{ top: "-18%", right: "0" }}></div>
//       <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

//       <Routes>
//         <Route path="/admin" element={user ? <AdminHome /> : <AdminAuth />} />
//         <Route path="/" element={ user?.user?.isUser ? (   <Navigate to="/home" /> ) : ( <Navigate to="/login" /> ) }/>
//         <Route path="/auth" element={  user?.user?.verified ? <Navigate to="../home" /> : <Login1 />}/>
//         <Route  path="/login" element={  user?.user?.isUser && !user.isBlock ? (  <Navigate to="../home" /> ) : (   <Login1 />  ) } />
//         <Route path="/signup" element={user?.user?.isUser ? <Navigate to="../home" /> : <Signup1 />} />
//         <Route path="/home" element={   user?.user?.isUser && !user.isBlock ? (  <Home /> ) : (   <Navigate to="../login" /> ) }/>
//         <Route path="/saved" element={   user?.user?.isUser && !user.isBlock ? (     <Saved />   ) : (     <Navigate to="../login" />   ) }/>
//         <Route path="/profile/:id" element={  user?.user?.isUser && !user.isBlock ? (  <Profile />) : (  <Navigate to="../login" />)}/>
//         <Route path="/chat" element={   user?.user?.isUser && !user.isBlock ? (  <Chat />) : (  <Navigate to="../login" />) } />
//         <Route path="*" element={<ErrorPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import LoadingPage from "./pages/loadingPage/LoadingPage";

// Lazy-loaded components
const Home = lazy(() => import("./pages/home/Home"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const AdminHome = lazy(() => import("./pages/AdminHome/AdminHome"));
const AdminAuth = lazy(() => import("./pages/AdminAuth/AdminAuth"));
const Chat = lazy(() => import("./pages/Chat/Chat"));
const Saved = lazy(() => import("./pages/Saved/Saved"));
const ErrorPage = lazy(() => import("./pages/Error/ErrorPage"));
const Login1 = lazy(() => import("./pages/Login/Login1"));
const Signup1 = lazy(() => import("./pages/SignUp/Signup1"));

function App() {
  const user = useSelector((state) => state.authReducer.authData);

  const isUser = user?.user?.isUser;
  const isBlocked = user?.isBlock;
  const isVerified = user?.user?.verified;

  // Protected routes for logged-in, non-blocked users
  const ProtectedRoute = ({ children }) =>
    isUser && !isBlocked ? children : <Navigate to="/login" />;

  // Public route for auth pages
  const AuthRoute = ({ children }) =>
    isUser ? <Navigate to="/home" /> : children;

  // Admin route
  const AdminRoute = ({ children }) =>
    user ? children : <AdminAuth />;

  return (
    <div className="App">
      {/* Optional visual effects */}
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Navigate to={isUser ? "/home" : "/login"} />} />

          <Route path="/admin" element={<AdminRoute><AdminHome /></AdminRoute>} />

          <Route path="/auth" element={isVerified ? <Navigate to="/home" /> : <Login1 />} />
          <Route path="/login" element={<AuthRoute><Login1 /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><Signup1 /></AuthRoute>} />

          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

          <Route path="/loading" element={<LoadingPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

