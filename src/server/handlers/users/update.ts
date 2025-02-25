import {
  UserResponseType,
  UserUpdateRequestType,
} from "@/server/schemas/users";
import { Context } from "hono";

export const updateUserHandler = async (c: Context) => {
  const { id } = c.req.param();
  if (id === "123") {
    return c.json({ code: 400, message: "ユーザーが存在しません。" }, 400);
  }
  const body: UserUpdateRequestType = await c.req.json();
  const response: UserResponseType = {
    id: Number(id),
    email: "dummy@example.com",
    name: body.name,
    age: body.age,
    hobbies: body.hobbies ?? [],
  };
  return c.json(response, 200);
};
