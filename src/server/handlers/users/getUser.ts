import "server-only";

import { UsersRepository } from "@/server/repositories";
import { Context } from "hono";

// ユーザー情報を1件取得
export const getUser = async (c: Context) => {
  const { id } = c.req.param();

  const user = await UsersRepository.findById(Number(id));
  if (!user) {
    return c.json(
      { code: 404, message: "ユーザーが見つかりませんでした。" },
      404,
    );
  }
  return c.json(user, 200);
};
