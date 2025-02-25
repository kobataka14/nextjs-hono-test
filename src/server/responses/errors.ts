import { ErrorResponseSchema } from "../schemas/errors";

// 共通エラーレスポンス

export const error400 = {
  400: {
    description: "Invalid request",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
};

export const error404 = {
  404: {
    description: "Not found",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
};

export const error422 = {
  422: {
    description: "Invalid request",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
};

export const error500 = {
  500: {
    description: "Internal server error",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
};
