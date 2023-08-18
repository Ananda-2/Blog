import Navbar from "./component/navbar/Navbar";
import Home from "./component/Pages/Home/Home"
import Single from "./component/Pages/Single/Single";
import Write from "./component/Write/Write";
import Settings from "./component/Pages/setting/Settings";
import Login from "./component/Pages/login/Login";
import Register from "./component/Pages/Register/Register";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";


function App() {
  
  const {user} = useContext(Context) ;

  return (  
    
    <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Write" element={user ?<Write/>:<Login/>} />
        <Route path="/Settings" element={user?<Settings /> : <Login/>} />
        <Route path="/Login" element={user ? <Home/> : <Login />} />
        <Route path="/Register" element={user ? <Home/> :<Register />} />


        <Route path="/post/:postId" element={<Single/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
