import { copyFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
copyFileSync(resolve(root, "index.vite.html"), resolve(root, "index.html"));
