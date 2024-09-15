"use server";
import prisma from "@/db/db";
import bcrypt from 'bcryptjs';

type FormData = {
  email: string | undefined;
  password: string | undefined;
};

export async function Login(formdata: FormData) {
  const { email, password }: FormData = Object.fromEntries(
    formdata.entries()
  ) 

  try {
    const foundUser = await prisma.user.findUnique({ where: { email } });

    if (!foundUser) {
      console.log("User not found");
      return null; // or handle the case as needed
    }
bcrypt.compare(password,foundUser.)
    console.log("User found", foundUser);

  } catch (error) {
    console.error("Error during login:", error);
    // Handle the error as needed
  }
}
