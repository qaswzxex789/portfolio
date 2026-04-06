import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.env.PORT || 3000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mimeTypes = {
    ".wav": "audio/wav",
    ".mp3": "audio/mpeg",
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".ts": "application/typescript; charset=utf-8"
};

const server = createServer((request, response) => {
    const requestUrl = request.url ?? "/";
    const safePath = path.normalize(decodeURIComponent(requestUrl)).replace(/^(\.\.[/\\])+/, "");
    const resolvedPath = safePath === "/" ? "index.html" : safePath.replace(/^[/\\]/, "");
    const filePath = path.join(__dirname, resolvedPath);

    if (!filePath.startsWith(__dirname)) {
        response.writeHead(403);
        response.end("Acesso negado.");
        return;
    }

    const pathToServe = existsSync(filePath) && statSync(filePath).isDirectory()
        ? path.join(filePath, "index.html")
        : filePath;

    if (!existsSync(pathToServe)) {
        response.writeHead(404);
        response.end("Arquivo nao encontrado.");
        return;
    }

    const extension = path.extname(pathToServe);
    response.writeHead(200, {
        "Content-Type": mimeTypes[extension] ?? "application/octet-stream",
        "Cache-Control": "no-cache"
    });

    createReadStream(pathToServe).pipe(response);
});

server.listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
