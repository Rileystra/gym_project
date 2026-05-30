const http = require("http");
const fs = require("fs");
const path = require("path");

const { getPlans, addMember, calculateBMI } = require("./src/gym");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml"
  };
  return types[extension] || "text/plain";
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/plans") {
    return sendJson(res, 200, getPlans());
  }

  if (req.method === "POST" && req.url === "/api/members") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", () => {
      try {
        const member = addMember(JSON.parse(body));
        return sendJson(res, 201, member);
      } catch (error) {
        return sendJson(res, 400, { error: error.message });
      }
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/bmi") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", () => {
      try {
        const result = calculateBMI(JSON.parse(body));
        return sendJson(res, 200, result);
      } catch (error) {
        return sendJson(res, 400, { error: error.message });
      }
    });
    return;
  }

  let filePath = path.join(PUBLIC_DIR, req.url === "/" ? "index.html" : req.url);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 - Page Not Found</h1>");
      return;
    }
    res.writeHead(200, { "Content-Type": getContentType(filePath) });
    res.end(content);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Gym Application running at http://localhost:${PORT}`);
  });
}

module.exports = server;
