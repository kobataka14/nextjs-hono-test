import "server-only";

import { UsersRepository } from "@/server/repositories";
import { Context } from "hono";

export const deleteUser = async (c: Context) => {
  const { id } = c.req.param();
  const isUserExists = await UsersRepository.exists(Number(id));
  if (!isUserExists) {
    return new Response(null, { status: 404 });
  }
  await UsersRepository.delete(Number(id));

  return new Response(null, { status: 204 });
};
