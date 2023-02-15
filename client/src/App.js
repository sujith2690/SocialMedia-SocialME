import "./App.css";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminAuth from "./pages/AdminAuth/AdminAuth";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Saved from "./pages/Saved/Saved";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      <Routes>

      <Route path="/admin" element={user? <AdminHome/>  : <AdminAuth /> }/>
      {/* <Route path="/error" element={ <ErrorPage/> }/> */}
      <Route path='/' element = {user?.user?.isUser?<Navigate to = "/home"/>:<Navigate to ='/login'/> }/>
      <Route path='/login' element = {user?.user?.isUser && !user.isBlock?<Navigate to = "../home"/>:<Login/> }/>
      <Route path='/signup' element = {user?.user?.isUser?<Navigate to = "../home"/>:<SignUp/> }/>
      <Route path = '/home' element = {user?.user?.isUser && !user.isBlock? <Home/>:<Navigate to ='../login'/> }/>
      <Route path = '/saved' element = {user?.user?.isUser && !user.isBlock? <Saved/>:<Navigate to ='../login'/> }/>
      <Route path='/auth' element = {user?.user?.verified?<Navigate to = '../home'/>:<Login/>}/>
      <Route path='/profile/:id'  element = {user?.user?.isUser && !user.isBlock?<Profile/>:<Navigate to = "../login"/>}/>
      <Route path='/chat'  element = {user?.user?.isUser && !user.isBlock?<Chat/>:<Navigate to = "../login"/>}/>

    </Routes>
    </div>
  );
}

export default App;
