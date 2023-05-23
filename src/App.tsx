import "./App.css";
import LoginPage from "./Pages/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import UserInfoPage from "./Pages/UserInfoPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/user-info" element={<UserInfoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
