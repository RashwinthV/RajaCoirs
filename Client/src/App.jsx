import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login&Register/Login";
import Register from "./Pages/Login&Register/Register";
import { ToastContainer } from "react-toastify";
import Profile from "./Pages/User/Profile";
import About from "./Pages/About";
import Products from "./Pages/Products";
import Infra from "./Pages/Infra";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Footercomps/contact";
import Privacy from "./Pages/Footercomps/privacy";
import Terms from "./Pages/Footercomps/terms";
import ScrollToTopButton from "./Components/ScrollButton";

function App() {
  return (
    <div style={{ background: "#ccfacc" }}>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/infrastructure" element={<Infra />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <ScrollToTopButton/>
      <Footer />
    </div>
  );
}

export default App;
