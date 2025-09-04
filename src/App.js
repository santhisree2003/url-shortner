import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShortenerPage from "./pages/ShortenerPage";
import StatsPage from "./pages/StatsPage";
import RedirectHandler from "./pages/RedirectHandler";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" href="/">Shorten</Button>
          <Button color="inherit" href="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:shortcode" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </Router>
  );
}
