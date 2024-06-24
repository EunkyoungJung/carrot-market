"use server";

import { z } from "zod";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "../lib/constants";

const fromSchema = z.object({
  email: z.string().email(),
  password: z
    .string({ required_error: "Password is required." })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirm_password: z.string().min(10),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = fromSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log("result.data", result.data);
  }
};
