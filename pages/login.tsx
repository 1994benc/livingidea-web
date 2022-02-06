import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import { GoogleIcon } from "../components/icons/GoogleIcon";
import GithubIcon from "../components/icons/GithubIcon";
import { signInWithSocial } from "../services/auth/signInWithSocial";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function LogIn() {
  const [user, loading, error] = useAuthState(getAuth());
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    router.replace("/");
  }

  return (
    <MainLayout>
      <div>
        <h1 className="font-bold text-3xl">Log in</h1>
        <div className="my-6 flex gap-3 flex-col">
          <button
            className="
            primary-btn"
            onClick={async () => {
              signInWithSocial(new GoogleAuthProvider());
            }}
          >
            <GoogleIcon></GoogleIcon>
            <div>Continue with Google</div>
          </button>
          <button
            className="
            primary-btn"
            onClick={async () => {
              signInWithSocial(new GithubAuthProvider());
            }}
          >
            <GithubIcon></GithubIcon>
            <div>Continue with GitHub</div>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
