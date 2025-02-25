import { UserListResponseType } from "@/server/schemas/users";
import { Context } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * ユーザー取得処理
 */

// ユーザー情報を1件取得
export const getUserByIdHandler = async (c: Context) => {
  const { id } = c.req.param();
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      hobbies: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!user) {
    return c.json(
      { code: 404, message: "ユーザーが見つかりませんでした。" },
      404,
    );
  }
  // const response: UserResponseType = {
  //   id,
  //   name: "John Doe",
  //   email: "john@example.com",
  //   age: 42,
  //   hobbies: [],
  // };
  return c.json(user, 200);
};

// ユーザー一覧を取得
export const getUsersHandler = (c: Context) => {
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
