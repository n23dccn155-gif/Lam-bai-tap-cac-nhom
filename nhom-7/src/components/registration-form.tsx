"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/schemas/auth";
import { registerUser } from "@/app/actions/register";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsSubmitting(true);
    setServerMsg(null);
    
    try {
      const response = await registerUser(data);
      if (response.success) {
        setServerMsg({ type: "success", text: response.message });
        reset();
      } else {
        setServerMsg({ type: "error", text: response.message });
      }
    } catch (err) {
      setServerMsg({ type: "error", text: "Đã có lỗi xảy ra. Vui lòng thử lại sau." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[440px] bg-neutral-900/40 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              Bắt đầu ngay <span className="text-blue-500">.</span>
            </h1>
            <p className="text-neutral-400 font-medium">
              Tạo tài khoản để trải nghiệm dịch vụ.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Họ và tên</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-neutral-600 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  {...register("name")}
                  className={cn(
                    "w-full bg-neutral-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-700 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50",
                    errors.name && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50"
                  )}
                  placeholder="Họ tên của bạn"
                />
              </div>
              <AnimatePresence mode="wait">
                {errors.name && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-red-400 text-xs font-medium ml-1 flex items-center gap-1.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-neutral-600 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  {...register("email")}
                  className={cn(
                    "w-full bg-neutral-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-700 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50",
                    errors.email && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50"
                  )}
                  placeholder="example@gmail.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs font-medium ml-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Mật khẩu</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-neutral-600 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className={cn(
                      "w-full bg-neutral-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-neutral-700 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50",
                      errors.password && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50"
                    )}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-600 hover:text-neutral-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs font-medium ml-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Xác nhận</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-neutral-600 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    {...register("confirmPassword")}
                    type={showPassword ? "text" : "password"}
                    className={cn(
                      "w-full bg-neutral-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-700 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50",
                      errors.confirmPassword && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50"
                    )}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs font-medium ml-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-900/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Đang kiểm tra dữ liệu...
                  </>
                ) : (
                  <>
                    Đăng Ký Ngay <CheckCircle2 className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Server Message */}
            <AnimatePresence>
              {serverMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "p-4 rounded-2xl flex items-center gap-3 text-sm font-medium",
                    serverMsg.type === "success" 
                      ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  )}
                >
                  {serverMsg.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  {serverMsg.text}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
