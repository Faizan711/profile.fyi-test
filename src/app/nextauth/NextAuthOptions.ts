import Credentials from "next-auth/providers/credentials";
import { SessionStrategy } from "next-auth";

export const authOptions = {
  session: {
    strategy: <SessionStrategy>"jwt", // session Stategy type for JWT
    maxAge: 2 * 24 * 60 * 60, // 2 days
  },
  providers: [
    Credentials({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as any;

        if (email === "admin@gmail.com" && password === "admin@123") {
          return {
            id: "1", // Changed Id to id (lowercase)
            email: email,
            userName: "Faizan",
          };
        } else {
          return null;
        }
      },
    }),
  ],
};
