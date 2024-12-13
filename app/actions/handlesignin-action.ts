// "use server";

import { signIn } from "next-auth/react";

export async function handleSignInAction(prev: any, formData: FormData) {
  const signinData = {
    email: formData.get("email"),
    role: formData.get("role"),
  };

  try {
    const result = await signIn("nodemailer", {
      email: signinData.email,
      role: signinData.role,
    });

    return {
      message: `Check email for signup link ${result}`,
    };
  } catch (error) {
    return {
      message: `We encountered an error sending link to your email ${error}`,
    };
  }
}
