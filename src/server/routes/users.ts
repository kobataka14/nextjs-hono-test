import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import {
  UserIdParamsSchema,
  UserCreateSchema,
  UserGetSchema,
  UserListSchema,
  UserUpdateSchema,
  UserListParamsSchema,
} from "../schemas/users";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "@/server/handlers/users";
import { error400, error404, error422, error500 } from "../responses/errors";
import { defaultValidationHook } from "../middlewares/validationError";
import { handleError } from "../middlewares/errorHandler";

const users = new OpenAPIHono({
  defaultHook: defaultValidationHook, // handling validation errors
});
users.onError(handleError);

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
  createUser,
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
  getUser,
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
  getUsers,
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
  updateUser,
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
  deleteUser,
);

export default users;
