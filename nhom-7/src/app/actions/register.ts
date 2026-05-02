"use server";

import { registerSchema, RegisterInput } from "@/lib/schemas/auth";

export async function registerUser(data: RegisterInput) {
  // Validate lại ở Server (Double Validation)
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Giả lập xử lý database (Ví dụ: lưu vào DB)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("Đăng ký thành công:", result.data);

  return {
    success: true,
    message: "Đăng ký thành viên thành công!",
  };
}
