import { z } from "@hono/zod-openapi";

/**
 * レスポンススキーマ
 */
// ホビースキーマ
export const HobyGetSchema = z
  .object({
    name: z.string().describe("趣味"),
  })
  .openapi("Hobby");

export type HobyGetType = z.infer<typeof HobyGetSchema>;
