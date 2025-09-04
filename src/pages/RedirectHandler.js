import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RedirectHandler() {
  const { shortcode } = useParams();

  useEffect(() => {
    const links = JSON.parse(localStorage.getItem("shortLinks")) || [];
    const link = links.find(l => l.shortcode === shortcode);

    if (link) {
      const now = new Date();
      if (now < new Date(link.expiry)) {
        // Record click
        link.clicks.push({ time: now, source: document.referrer || "direct", location: "Unknown" });
        localStorage.setItem("shortLinks", JSON.stringify(links));

        window.location.href = link.longUrl;
      } else {
        alert("⚠️ This link has expired.");
      }
    } else {
      alert("❌ Shortcode not found.");
    }
  }, [shortcode]);

  return <p>Redirecting...</p>;
}
