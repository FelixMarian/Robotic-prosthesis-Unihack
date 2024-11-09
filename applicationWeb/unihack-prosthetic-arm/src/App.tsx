import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
// @ts-ignore
import Home from "./pages/Home";
// @ts-ignore
import Presentation from "./pages/Presentation";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}> </Route>
                <Route path="/presentation" element={<Presentation/>}> </Route>
            </Routes>
        </BrowserRouter>
    </>
  );
}

// @ts-ignore
export default App
