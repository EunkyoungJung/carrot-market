"use server";

import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

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
      .min(3, "way too short")
      .max(10, "way too loooong")
      .trim()
      .transform((x) => x.trim())
      .refine(checkUsername, "no potatoes are allowed"),
    email: z.string().email(),
    password: z
      .string()
      .min(10)
      .regex(
        passwordRegex,
        "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-"
      ),
    confirm_password: z.string().min(10),
  })
  .refine(checkPasswords, {
    message: "both passwords should be the same.",
    path: ["confirm_password"],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  "use server";

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = fromSchema.safeParse(data);
  if (!result.success) {
    console.log("hah", result.error.flatten());
    return result.error.flatten();
  } else {
    // return result.data;
    console.log("result.data", result.data);
  }
  // console.log("prevState", prevState);
  // console.log("formData", formData);

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // console.log("create user");
  // //   redirect("/");
  // return {
  //   errors: ["wrong password", "passwords too short"],
  // };
};
