"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../../../public/images/logo.png"
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import styles from "./login.module.css"

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status == "authenticated") {
      router.replace("/");
    }
  }, [session, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    if (!password || password.length < 8) {
      setError("This password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError("Invalid username or password");
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Link href="/">
          <img src={Logo.src} className={styles.logo} />
        </Link>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            required
          />
          <button className={styles.button} type="submit">
            Login
          </button>
          <p>{error && error}</p>
          <Link className={styles.link} href="/pages/register">
            Don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
