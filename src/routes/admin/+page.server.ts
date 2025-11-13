import {
  loginAdmin,
  registerAdmin,
  resetAdminPassword,
} from "$lib/server/admin";
import { readAdminKey } from "$lib/server/config";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }: any) => {
  if (locals.admin) {
    throw redirect(302, "/admin/dashboard");
  }
  return { admin: null };
};

export const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    const token = loginAdmin(email, password);
    if (!token) {
      return { success: false, message: "Invalid credentials" };
    }
    cookies.set("admin_session", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return { success: true };
  },
  register: async ({ request }) => {
    const data = await request.formData();
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    const key = String(data.get("key") || "");
    const expected = readAdminKey();
    try {
      if (!expected) {
        return {
          success: false,
          message: "Registration key not configured on server",
        };
      }
      registerAdmin(email, password, key, expected);
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e?.message || "Registration failed" };
    }
  },
  reset: async ({ request }) => {
    const data = await request.formData();
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    const key = String(data.get("key") || "");
    const expected = readAdminKey();
    try {
      if (!expected)
        return {
          success: false,
          message: "Reset key not configured on server",
        };
      resetAdminPassword(email, password, key, expected);
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e?.message || "Reset failed" };
    }
  },
};
