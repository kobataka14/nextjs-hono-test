import "server-only";

import { UsersRepository } from "@/server/repositories";
import { UserUpdateRequestType } from "@/server/schemas/users";
import { Context } from "hono";

export const updateUser = async (c: Context) => {
  const { id } = c.req.param();
  const isUserExists = await UsersRepository.exists(Number(id));
  if (!isUserExists) {
    return c.json(
      { code: 400, message: "ユーザーが見つかりませんでした。" },
      400,
    );
  }

  const body: UserUpdateRequestType = await c.req.json();
  const response = await UsersRepository.update(Number(id), body);

  return c.json(response, 200);
};
