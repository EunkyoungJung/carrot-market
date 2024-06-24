"use server";

import { z } from "zod";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "../lib/constants";

const checkUsername = (name: string) => {
  return !name.includes("potato");
};

const checkPasswords = (x: any) => {
  const { password, confirm_password } = x;
  return password === confirm_password;
};

const fromSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "invalid hoho",
        required_error: "required hoho",
      })
      .trim()
      .transform((x) => x.trim())
      .refine(checkUsername, "no potatoes are allowed"),
    email: z.string().email(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(10),
  })
  .refine(checkPasswords, {
    message: "both passwords should be the same.",
    path: ["confirm_password"],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = fromSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log("result.data", result.data);
  }
};
