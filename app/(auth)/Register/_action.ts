"use server";
import prisma from "@/db/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
const validation = z
  .object({
    email: z.string().email("please enter a valid email"),
    password: z.string().min(6, "at leaset 6 characters"),
    confirmPassword:z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

export async function Register(formdata: globalThis.FormData) {
  const email = formdata.get("email") as string | null;
  const password = formdata.get("password") as string | null;
  const confirmPassword = formdata.get("confirmPassword") as string | null;

  console.log(email, password);

  try {
    const foundUser = await prisma.user.findUnique({ where: { email } });

    if (foundUser) {
      console.log("User already exists");
      return null; // or handle the case as needed
    }

    const formIsValid = validation.safeParse({ email, password, confirmPassword })
    if (!formIsValid.success) {
      console.log(formIsValid.error.errors)
      return null
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log("User registered", { email, password });

    return { message: "User registered successfully" };
  } catch (error) {
    console.error("Error during registration:", error);
    // Handle the error as needed
  }
}
