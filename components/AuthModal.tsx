"use client";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";

import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen, mode } = useAuthModal();
  const [authMode, setAuthMode] = useState<"sign_in" | "sign_up">("sign_in");

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  useEffect(() => {
    if (mode) {
      setAuthMode(mode);
    }
  }, [mode]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title={authMode === "sign_in" ? "Welcome back" : "Create an Account"}
      description={
        authMode === "sign_in"
          ? "Login to your account"
          : "Sign up to get started"
      }
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        // magicLink
        providers={["github"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
        view={authMode}
      />
    </Modal>
  );
};

export default AuthModal;
