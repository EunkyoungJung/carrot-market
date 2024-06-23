"use server";

import { redirect } from "next/navigation";

export const handleForm = async (prevState: any, formData: FormData) => {
  "use server";

  console.log("prevState", prevState);
  console.log("formData", formData);

  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("logged in!");
  //   redirect("/");
  return {
    errors: ["wrong password", "passwords too short"],
  };
};
