import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { validateUrl, validateShortcode } from "../utils/validators";
import logger from "../utils/logger";

export default function ShortenerPage() {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
  };

  const shortenUrls = () => {
    const newResults = urls.map((u) => {
      if (!validateUrl(u.longUrl)) {
        return { error: "❌ Invalid URL" };
      }
      if (u.shortcode && !validateShortcode(u.shortcode)) {
        return { error: "❌ Invalid shortcode (use letters/numbers, 3–10 chars)" };
      }

      const code = u.shortcode || Math.random().toString(36).substr(2, 6);
      const expiry = new Date(Date.now() + ((u.validity || 30) * 60000));

      const entry = {
        ...u,
        shortcode: code,
        expiry,
        createdAt: new Date(),
        clicks: []
      };

      // Save in localStorage
      const existing = JSON.parse(localStorage.getItem("shortLinks")) || [];
      // Ensure uniqueness
      if (existing.some(e => e.shortcode === code)) {
        return { error: "❌ Shortcode already exists!" };
      }
      existing.push(entry);
      localStorage.setItem("shortLinks", JSON.stringify(existing));

      logger.log("URL_SHORTENED", entry);

      return entry;
    });
    setResults(newResults);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">Shorten URLs</Typography>
      {urls.map((u, i) => (
        <Grid container spacing={2} key={i} sx={{ mt: 1 }}>
          <Grid item xs={5}>
            <TextField
              label="Long URL"
              fullWidth
              value={u.longUrl}
              onChange={(e) => handleChange(i, "longUrl", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Validity (minutes)"
              fullWidth
              value={u.validity}
              onChange={(e) => handleChange(i, "validity", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Custom Shortcode"
              fullWidth
              value={u.shortcode}
              onChange={(e) => handleChange(i, "shortcode", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button sx={{ mt: 2 }} variant="contained" onClick={addUrlField}>+ Add URL</Button>
      <Button sx={{ mt: 2, ml: 2 }} variant="contained" color="success" onClick={shortenUrls}>
        Shorten
      </Button>

      {results.map((r, i) => (
        <Typography key={i} sx={{ mt: 2 }}>
          {r.error
            ? r.error
            : `✅ Short URL: http://localhost:3000/${r.shortcode} (expires: ${new Date(r.expiry).toLocaleString()})`}
        </Typography>
      ))}
    </Paper>
  );
}
