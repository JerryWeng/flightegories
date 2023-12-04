"use client"
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

import Link from 'next/link';

const Register = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const username = e.target[0].value;
      const firstName = e.target[1].value;
      const lastName = e.target[2].value;
      const password = e.target[3].value;
      const confPassword = e.target[4].value;

      if (!password || password.length < 8) {
        setError("This password is too short, please use a password with more than 8 characters");
        return;
      }

      if (password != confPassword) {
        setError("The passwords do not match. Please re-enter your password");
        return;
      }

      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            firstName,
            lastName
          })
        })
        if (res.status === 400) {
          setError("This username is already in use");
        }
        if (res.status === 200) {
          setError("");
          router.push("/login");
        }
      } catch (error) {
        setError("Error, try again");
        console.log(error);
      }
    }

    return (
      <div>
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                type = "text"
                placeholder = "Username"
                required
                />
                <input
                type = "text"
                placeholder = "First Name"
                required
                />
                <input
                type = "text"
                placeholder = "Last Name"
                required
                />
                <input
                type = "password"
                placeholder = "Password"
                required
                />
                <input
                type = "password"
                placeholder = "Confirm Password"
                required
                />
                <button type = "submit">Register</button>
                <p>{error && error}</p>
            </form>
            <Link href = "/login">Already have an account?</Link>
        </div>
      </div>
    )
  }
  
  export default Register;