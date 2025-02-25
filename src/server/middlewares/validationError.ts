// /server/middlewares/validationError.ts
import { ZodError } from "zod";
import type { ValidationTargets, Context } from "hono";

// 成功時と失敗時の型を含むバリデーション結果の型を定義
export type ValidationResult =
  | { target: keyof ValidationTargets; success: true; data: unknown }
  | { target: keyof ValidationTargets; success: false; error: ZodError };

// Zodエラーを整形する関数
export const formatZodErrors = (
  result: Extract<ValidationResult, { success: false }>,
): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as string;
    if (field) {
      if (!errors[field]) {
        errors[field] = [];
      }
      errors[field].push(issue.message);
    }
  }
  return errors;
};

// Hono の defaultHook 用の関数
export const defaultValidationHook = (result: ValidationResult, c: Context) => {
  if (!result.success) {
    return c.json(
      {
        code: 422,
        message: "バリデーションエラーです。",
        errors: formatZodErrors(result),
      },
      422,
    );
  }
  // 成功時は何も返さず、Hono の通常処理に委ねる
};
