import { AuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";

export const signInWithSocial = async (provider: AuthProvider) => {
  try {
    await signInWithPopup(getAuth(), provider);
  } catch (e: any) {
    console.error(e);
    toast.error(e.message);
    return false;
  }
};
