import "server-only";

import { UserListResponseType } from "@/server/schemas/users";
import { Context } from "hono";

// ユーザー一覧を取得
export const getUsers = (c: Context) => {
  const { page, limit } = c.req.query();
  console.log("page:", page);
  console.log("limit:", limit);
  const response: UserListResponseType = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      age: 42,
      hobbies: [],
    },
    {
      id: 2,
      name: "Tom Smith",
      email: "tom@example.com",
      age: 35,
      hobbies: [],
    },
  ];
  return c.json(response, 200);
};
