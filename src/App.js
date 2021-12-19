import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { useContext } from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AllPicturesPage from "./pages/AllPicturesPage";
import AlbumPage from "./pages/AlbumPage";
import AllAlbumsPage from "./pages/AllAlbumsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UploadImagePage from "./pages/UploadImagePage";
import AuthContext from "./store/auth-context";
import ImagePage from "./pages/ImagePage";
import EditImagePage from "./pages/EditImagePage";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-images" element={<AllPicturesPage />} />
        <Route path="/all-albums" element={<AllAlbumsPage />} />
        <Route path="/album-information/:category" element={<AlbumPage />} />
        <Route path="/image-information/:id" element={<ImagePage />} />
        {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
        {!isLoggedIn && <Route path="/register" element={<RegisterPage />} />}

        {isLoggedIn && (
          <Route path="/upload-image" element={<UploadImagePage />} />
          
        )}
  {isLoggedIn && (
          <Route path="/edit-image/:id" element={<EditImagePage />} />
          
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
