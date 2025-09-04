import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from "@mui/material";

export default function StatsPage() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortLinks")) || [];
    setLinks(stored);
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">Shortened URL Statistics</Typography>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expiry</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map((link, i) => (
            <TableRow key={i}>
              <TableCell>{`http://localhost:3000/${link.shortcode}`}</TableCell>
              <TableCell>{link.longUrl}</TableCell>
              <TableCell>{new Date(link.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(link.expiry).toLocaleString()}</TableCell>
              <TableCell>{link.clicks.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
