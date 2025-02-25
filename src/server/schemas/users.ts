import { z } from "@hono/zod-openapi";
import { HobyGetSchema } from "./hobbies";

/**
 * スキーマ定義と型出力
 */

// IDパラメータ（ユーザー取得、削除に使用）
export const UserIdParamsSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .min(1)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: 123,
    }),
});

// 一覧取得パラメータ
export const UserListParamsSchema = z.object({
  page: z.optional(z.coerce.number().int().min(1)).openapi({
    param: {
      name: "page",
      in: "query",
    },
    example: 1,
  }),
  limit: z
    .optional(z.coerce.number().int().min(1).max(250, "取得上限<=250"))
    .openapi({
      param: {
        name: "limit",
        in: "query",
      },
      example: 10,
    }),
});

// 作成・更新の基本スキーマ
const UserBaseSchema = z.object({
  name: z.string().min(1).max(255).openapi({
    example: "ライオン太郎",
  }),
  age: z.number().int().positive().openapi({
    example: 42,
  }),
  hobbies: z
    .array(HobyGetSchema)
    .default([])
    .openapi({
      example: [
        {
          name: "読書",
        },
        {
          name: "旅行",
        },
      ],
    }),
});

//ユーザー作成リクエストボディ
export const UserCreateSchema = UserBaseSchema.extend({
  email: z.string().email().openapi({
    example: "lion@example.com",
  }),
});

// ユーザー更新リクエストボディ
export const UserUpdateSchema = UserBaseSchema;

/**
 * レスポンススキーマ
 */
// ユーザースキーマ
export const UserGetSchema = z
  .object({
    id: z.number().int().positive().openapi({
      example: 123,
    }),
    name: z.string().openapi({
      example: "ライオン太郎",
    }),
    email: z.string().email().openapi({
      example: "lion@example.com",
    }),
    age: z.number().int().positive().openapi({
      example: 42,
    }),
    hobbies: z
      .array(HobyGetSchema)
      .default([])
      .openapi({
        example: [
          {
            name: "読書",
          },
          {
            name: "旅行",
          },
        ],
      }),
  })
  .openapi("User");

// ユーザーリストスキーマ
export const UserListSchema = z.array(UserGetSchema);

export type UserIdParamsType = z.infer<typeof UserIdParamsSchema>;
export type UserListParamsType = z.infer<typeof UserListParamsSchema>;
export type UserCreateRequestType = z.infer<typeof UserCreateSchema>;
export type UserResponseType = z.infer<typeof UserGetSchema>;
export type UserListResponseType = z.infer<typeof UserListSchema>;
export type UserUpdateRequestType = z.infer<typeof UserUpdateSchema>;
