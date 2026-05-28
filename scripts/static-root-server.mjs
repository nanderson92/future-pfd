import { createServer } from "http";
import { readFile } from "fs/promises";
import { extname, join, resolve } from "path";

const root = resolve(".");
const port = Number(process.env.PORT || 4180);
const types = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);
    const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
    const file = resolve(join(root, pathname));
    if (!file.startsWith(root)) {
      response.writeHead(403);
      response.end("forbidden");
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end("not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`root static server: http://127.0.0.1:${port}/`);
});
