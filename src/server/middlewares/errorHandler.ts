import { Context } from "hono";

// グローバルなエラーハンドリング
export const handleError = (error: Error, c: Context): Response => {
  const message =
    error instanceof Error ? error.message : "something unexpected happened";

  return c.json(
    {
      code: 500,
      message,
    },
    500,
  );
};
