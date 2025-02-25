import { z } from "@hono/zod-openapi";

// エラー
export const ErrorResponseSchema = z
  .object({
    code: z.number().openapi({
      example: 400,
    }),
    message: z.string().openapi({
      example: "something went wrong",
    }),
    errors: z
      .record(z.array(z.string()))
      .optional()
      .openapi({
        example: { prop1: ["error message"] },
      }),
  })
  .openapi("ErrorResponse");

export type ErrorSchemaType = z.infer<typeof ErrorResponseSchema>;
