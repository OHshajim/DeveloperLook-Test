import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import { Toaster } from "./components/ui/sonner";

function App() {

    return (
        <BrowserRouter>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
