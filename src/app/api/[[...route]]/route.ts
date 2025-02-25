import { OpenAPIHono } from "@hono/zod-openapi";
import { handle } from "hono/vercel";
import { apiReference } from "@scalar/hono-api-reference";
import { swaggerUI } from "@hono/swagger-ui";
import users from "@/server/routes/users";
import health from "@/server/routes/health";

export const runtime = "nodejs";

const app = new OpenAPIHono().basePath("/api");

// 各モジュールをマウントする
app.route("/users", users);
app.route("/health", health);
// ...同様に追加モジュールをマウント

if (process.env.NODE_ENV !== "production") {
  // OpenAPI
  app.doc("/docs", {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
    },
  });
  // Swagger UI
  app.get(
    "/ui",
    swaggerUI({
      url: "/api/docs",
    }),
  );
  // API Reference
  app.get(
    "/reference",
    apiReference({
      pageTitle: "Hono API Reference",
      spec: {
        url: "/api/docs",
      },
    }),
  );
}

app.notFound((c) => c.text("404 Not Found", 404));

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
