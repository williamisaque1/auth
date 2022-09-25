import { unstable_getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import { authOptions } from "../pages/api/auth/[...nextauth]";

async function protectedRouter(context) {
  /*
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  */
  const session = await getSession(context);
  console.log(session);
  if (false) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
}
export default protectedRouter;
