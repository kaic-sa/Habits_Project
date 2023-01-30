import Fastify from "fastify";
import { prisma } from "./lib/prisma";
import cors from "@fastify/cors";
import { appRoute } from "./lib/route";

const app = Fastify();

app.register(cors);
app.register(appRoute);
app.listen({ port: 3333, host: "192.168.1.101" }).then(() => {
  console.log("running on port 3333");
});
