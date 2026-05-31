import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const NS = "7310b972764046c08f2be935ced258bc";
const dir = path.join(root, "public", "images", "blog");

const keys = JSON.parse(
  execSync(`npx wrangler kv key list --namespace-id ${NS} --remote`, {
    cwd: root,
    encoding: "utf8",
  }),
);

fs.mkdirSync(dir, { recursive: true });
for (const { name } of keys.filter((k) => k.name.startsWith("m:"))) {
  const file = name.replace(/^m:/, "");
  const out = path.join(dir, file);
  if (fs.existsSync(out)) {
    console.log("skip", file);
    continue;
  }
  const buf = execSync(`npx wrangler kv key get "${name}" --namespace-id ${NS} --remote`, {
    cwd: root,
    encoding: "buffer",
    maxBuffer: 20 * 1024 * 1024,
  });
  fs.writeFileSync(out, buf);
  console.log("ok", file, buf.length);
}
