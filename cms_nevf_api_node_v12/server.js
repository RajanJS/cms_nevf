import { ServerConfig } from "./config";
import {
  redirectRouter, routerV1, authRouter, routerV1Docs
} from "./routes";

async function main() {
  const PORT = process.env.PORT || 3000;
  const server = new ServerConfig({
    port: PORT,
    middleware: [],
    routers: [
      redirectRouter,
      routerV1,
      authRouter,
      routerV1Docs
    ]
  });

  server.listen();
}

main();