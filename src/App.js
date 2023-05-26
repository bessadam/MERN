import React from "react";
// mui
import Container from "@mui/material/Container";
// redux
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
// router
import { Route, Routes } from "react-router-dom";
// components
import { Header } from "./components";
// pages
import { Home, FullPost, Registration, AddPost, Login, TagPage } from "./pages";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/tags/:tag" element={<TagPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
