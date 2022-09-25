import Head from "next/head";
import Image from "next/image";
import Component from "../components/login-btn";
import Componen from "../components/acessToken";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import protectedRouter from "../utis/protectedRouter";

export default function Home() {
  const { data: session } = useSession();

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
  return session;
}
