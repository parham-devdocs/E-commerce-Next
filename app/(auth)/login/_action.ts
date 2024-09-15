"use server";
import prisma from "@/db/db";
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";

type FormData = {
  email: string | undefined;
  password: string | undefined;
};

export async function Login(formdata: FormData) {
  const { email, password }: FormData = Object.fromEntries(formdata.entries()) as FormData

  try {
    const foundUser = await prisma.user.findUnique({ where: { email } });

    if (!foundUser) {
      console.log("User not found");
      return null; // or handle the case as needed
    }
      const passwordValidity = bcrypt.compare(password, foundUser.password)
      if (passwordValidity) {
          localStorage.setItem("userId", foundUser.id)
              console.log("User found", foundUser);

          return {message:"user logged in"}
      }

  } catch (error) {
    console.error("Error during login:", error);
    // Handle the error as needed
  }
}
