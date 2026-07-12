import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const astroBin = fileURLToPath(
  new URL("../node_modules/astro/astro.js", import.meta.url),
);
const child = spawn(process.execPath, [astroBin, ...process.argv.slice(2)], {
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: "1",
  },
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
