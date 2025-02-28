import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddData from "./components/AddData";
import AllData from "./components/AllData";
import Update from "./components/Update";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import SignedOutPage from "./components/SignedOutPage";
import UndefinedRoutePage from "./components/UndefinedRoutePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Toaster />
        <SignedIn>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add_data" element={<AddData />} />
            <Route path="/view_data/:roll" element={<AllData />} />
            <Route path="/update_data/:roll" element={<Update />} />
            <Route path="/*" element={<UndefinedRoutePage />} />
          </Routes>
        </SignedIn>
        <SignedOut>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view_data/:roll" element={<SignedOutPage />} />
            <Route path="/*" element={<SignedOutPage />} />
          </Routes>
        </SignedOut>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
