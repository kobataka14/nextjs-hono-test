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

// 共通エラーレスポンス定義（OpenAPI用）
export const ErrorResponses = {
  400: {
    description: "Invalid request",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
  404: {
    description: "Not found",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
  422: {
    description: "Invalid request",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
  500: {
    description: "Internal server error",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
};

export type ErrorSchemaType = z.infer<typeof ErrorResponseSchema>;
