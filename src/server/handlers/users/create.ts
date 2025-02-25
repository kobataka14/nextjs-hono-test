import {
  UserCreateRequestType,
  UserResponseType,
} from "@/server/schemas/users";
import { Context } from "hono";

// ユーザー作成処理
export const createUserHandler = async (c: Context) => {
  const body: UserCreateRequestType = await c.req.json();
  const response: UserResponseType = {
    id: 100,
    email: "dummy@example.com",
    name: body.name,
    age: body.age,
    hobbies: body.hobbies ?? [],
  };
  return c.json(response, 201);
};
