// server.js
const express = require("express");
const fetch = require("node-fetch"); // install with npm install node-fetch
const app = express();

app.get("/", (req, res) => {
  res.send("Backend proxy is running!");
});

// Proxy endpoint: ?url=https://example.com
app.get("/proxy", async (req, res) => {
  const target = req.query.url;
  if (!target) {
    return res.status(400).send("Missing ?url parameter");
  }

  try {
    const response = await fetch(target);
    const text = await response.text();

    // Basic passthrough (you can add rewriting here if needed)
    res.send(text);
  } catch (err) {
    res.status(500).send("Error fetching target: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
