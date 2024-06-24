"use server";

import { z } from "zod";

const fromSchema = z.object({
  phone: z.string(),
  token: z.string().min(10),
});

export const smsVerification = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("phone"),
    password: formData.get("token"),
  };

  const result = fromSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log("result.data", result.data);
  }
};
