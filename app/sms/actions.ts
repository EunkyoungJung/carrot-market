"use server";

import { z } from "zod";
import validator from "validator";

const phoneSchema = z.object({
  phone: z.string().trim().refine(validator.isMobilePhone),
});

const tokenSchema = z.object({
  phone: z.coerce.number().min(100000).max(999999),
});

export const smsLogin = async (prevState: any, formData: FormData) => {
  const phoneData = {
    phone: formData.get("phone"),
  };
  const tokenData = {
    token: formData.get("token"),
  };

  const phoneResult = phoneSchema.safeParse(phoneData);
  const tokenResult = tokenSchema.safeParse(tokenData);
  if (!phoneResult.success) {
    return phoneResult.error.flatten();
  }
  if (!tokenResult.success) {
    return tokenResult.error.flatten();
  }
  console.log("phoneResult.data", phoneResult.data);
};
