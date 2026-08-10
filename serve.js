const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".mp4": 'video/mp4',
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
    let rel = path.normalize(urlPath).replace(/^([\\/])/, "");
    if (!rel || rel === "." || path.extname(rel) === "") rel = "index.html";
    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    fs.stat(file, (err, st) => {
      if (err || !st.isFile()) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("Not found");
      }
      const mime = MIME[path.extname(file).toLowerCase()] || "application/octet-stream";
      const range = req.headers.range;
      if (range) {
        const m = /bytes=(\d*)-(\d*)/.exec(range);
        let start = m && m[1] ? parseInt(m[1], 10) : 0;
        let end = m && m[2] ? parseInt(m[2], 10) : st.size - 1;
        if (isNaN(start) || start < 0) start = 0;
        if (isNaN(end) || end >= st.size) end = st.size - 1;
        if (start > end || start >= st.size) {
          res.writeHead(416, { "Content-Range": `bytes */${st.size}` });
          return res.end();
        }
        res.writeHead(206, {
          "Content-Type": mime,
          "Accept-Ranges": "bytes",
          "Content-Length": end - start + 1,
          "Content-Range": `bytes ${start}-${end}/${st.size}`,
        });
        return fs.createReadStream(file, { start, end }).pipe(res);
      }
      res.writeHead(200, {
        "Content-Type": mime,
        "Accept-Ranges": "bytes",
        "Content-Length": st.size,
      });
      fs.createReadStream(file).pipe(res);
    });
  })
  .listen(PORT, HOST, () => {
    const os = require("os");
    const nets = os.networkInterfaces();
    const urls = [];
    console.log(`Gaur City Centre site running on ${HOST}:${PORT}`);
    console.log(`  http://localhost:${PORT}`);
    for (const name of Object.keys(nets)) {
      for (const net of nets[name] || []) {
        if (net.family === "IPv4" && !net.internal) urls.push(`  http://${net.address}:${PORT}`);
      }
    }
    if (urls.length) {
      console.log(`\nLAN access (same Wi-Fi, any device):`);
      console.log(urls.join("\n"));
    } else {
      console.log(`\nNo LAN IP found — check your network or firewall.`);
    }
  });