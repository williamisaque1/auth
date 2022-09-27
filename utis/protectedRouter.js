import { unstable_getServerSession } from "next-auth/next";
import { getSession, getCsrfToken } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../pages/api/auth/[...nextauth]";

async function protectedRouter(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const sessions = await getSession(context);
  console.log("sessao");
  console.log(session);
  console.log(sessions);

  if (false) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
export default protectedRouter;
