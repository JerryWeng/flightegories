"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

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
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit">
            Login
          </button>
          <p>{error && error}</p>
          <Link href="/register">
            Don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
