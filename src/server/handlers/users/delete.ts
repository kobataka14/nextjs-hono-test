import { Context } from "hono";

export const deleteUserHandler = (c: Context) => {
  const { id } = c.req.param();
  if (id === "123") {
    return c.json({ code: 400, message: "ユーザーが存在しません。" }, 400);
  }
  // ここにユーザー削除処理
  return new Response(null, { status: 204 });
};
