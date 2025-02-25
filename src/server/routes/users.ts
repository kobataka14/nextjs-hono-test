import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import {
  UserIdParamsSchema,
  UserCreateSchema,
  UserGetSchema,
  UserListSchema,
  UserUpdateSchema,
  UserListParamsSchema,
} from "../schemas/users";
import { createUserHandler } from "../handlers/users/create";
import { getUserByIdHandler, getUsersHandler } from "../handlers/users/read";
import { updateUserHandler } from "../handlers/users/update";
import { deleteUserHandler } from "../handlers/users/delete";
import { error400, error404, error422, error500 } from "../responses/errors";
import { defaultValidationHook } from "../middlewares/validationError";

const users = new OpenAPIHono({
  defaultHook: defaultValidationHook, // handling validation errors
});

/**ルートの定義 */

// ユーザー登録
users.openapi(
  createRoute({
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": {
            schema: UserCreateSchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          "application/json": {
            schema: UserGetSchema,
          },
        },
        description: "Create a user",
      },
      ...error422,
      ...error500,
    },
  }),
  createUserHandler,
);

// ユーザー取得
users.openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    request: {
      params: UserIdParamsSchema,
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: UserGetSchema,
          },
        },
        description: "Retrieve the user",
      },
      ...error404,
      ...error422,
      ...error500,
    },
  }),
  getUserByIdHandler,
);

// ユーザー取得
users.openapi(
  createRoute({
    method: "get",
    path: "/",
    request: {
      query: UserListParamsSchema,
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: UserListSchema,
          },
        },
        description: "Retrieve the user list",
      },
      ...error422,
      ...error500,
    },
  }),
  getUsersHandler,
);

// ユーザー更新
users.openapi(
  createRoute({
    method: "put",
    path: "/{id}",
    request: {
      params: UserIdParamsSchema,
      body: {
        content: {
          "application/json": {
            schema: UserUpdateSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: UserGetSchema,
          },
        },
        description: "Update the user",
      },
      ...error400,
      ...error422,
      ...error500,
    },
  }),
  updateUserHandler,
);

// ユーザー削除
users.openapi(
  createRoute({
    method: "delete",
    path: "/{id}",
    request: {
      params: UserIdParamsSchema,
    },
    responses: {
      204: {
        description: "Delete the user",
      },
      ...error400,
      ...error422,
      ...error500,
    },
  }),
  deleteUserHandler,
);

export default users;
