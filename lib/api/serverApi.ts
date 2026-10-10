import { cookies } from "next/headers";
import { api } from "../../app/api/api";


export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const res = await api.get("/auth/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
