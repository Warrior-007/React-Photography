import "./App.css";
import { Routes, Route } from "react-router";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AllPicturesPage from "./pages/AllPicturesPage";
import AlbumPage from "./pages/AlbumPage";
import AllAlbumsPage from "./pages/AllAlbumsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UploadImagePage from "./pages/UploadImagePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-images" element={<AllPicturesPage />} />
        <Route path="/all-albums" element={<AllAlbumsPage />} />
        <Route path="/album-information" element={<AlbumPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload-image" element={<UploadImagePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
