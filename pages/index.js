import Head from "next/head";
import Image from "next/image";
import Component from "../components/login-btn";
import Componen from "../components/acessToken";
import styles from "../styles/Home.module.css";
import { useSession, getSession } from "next-auth/react";
import protectedRouter from "../utis/protectedRouter";
import { getToken } from "next-auth/jwt";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  if (process.browser === "undefined") {
    return null;
  }

  if (session) {
    return (
      <>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
      </>
    );
  }
  return <p>Access Denied</p>;
}

export async function getServerSideProps(context) {
  const session = await protectedRouter(context);
  const token = await getToken({
    req: context.req,
  });
  const tokenn = await getToken({ req: context.req, secret: token.jti });
  console.log("tokenn", tokenn);
  console.log("token", token);
  const sessions = await getSession({ ctx: context });

  console.log("secao", sessions);
  return session;
}
