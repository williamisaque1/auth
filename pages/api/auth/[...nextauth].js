import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, senha }) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}api/hello`, {
            method: "POST",
            body: JSON.stringify({ email, senha }),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();

          // If no error and we have user data, return it
          if (res.ok && user.token) {
            return user;
          }
          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          const message = error.response.data.message;
          console.log(message);
          //throw new Error(message);
        }
      },
      callbacks: {
        async session({ session, token }) {
          if (token) {
            session.name = token.name;
          }
          return session;
        },
        async jwt({ token, user }) {
          if (user) {
            token.name = user.name;
          }
          return token;
        },
      },
      secret: process.env.AUTH_SECRET,
      pages: {
        signIn: "/login",
        error: "/login",
      },
      jwt: {
        secret: process.env.AUTH_SECRET,
      },
    }),
  ],
};
export default NextAuth(authOptions);
