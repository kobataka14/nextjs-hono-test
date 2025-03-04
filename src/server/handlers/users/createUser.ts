import "server-only";

import { UsersRepository } from "@/server/repositories";
import { UserCreateRequestType } from "@/server/schemas/users";
import { Context } from "hono";

// ユーザー作成処理
export const createUser = async (c: Context) => {
  const body: UserCreateRequestType = await c.req.json();
  const response = await UsersRepository.create(body);

  return c.json(response, 201);
};
