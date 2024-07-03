import NextAuth from "next-auth";
import authConfig from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./model/user-model";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials == null) return null;
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) return "user not found";

          const isValid = bcrypt.compare(credentials.password, user.password);

          if (!isValid) return "invalid password";

          return user;
        } catch (error) {
          console.error(error);
          return error.message;
        }
      },
    }),
  ],
});
