import RegistrationForm from "@/components/registration-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 selection:bg-blue-500/30">
      {/* Background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Info Section */}
        <div className="hidden md:block space-y-6">

          <h2 className="text-5xl font-bold leading-tight text-white">
            Đăng ký thành viên
          </h2>
          <p className="text-gray-400 text-lg max-w-sm">
            Đăng ký ngay để trở thành thành viên của chúng tôi.
          </p>
          <div className="flex gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-gradient-to-br from-gray-700 to-gray-900" />
              ))}
            </div>
            <p className="text-gray-500 text-sm flex items-center">
              +1,200 thành viên đã tham gia
            </p>
          </div>
        </div>

        {/* Form Section */}
        <RegistrationForm />
      </div>


    </main>
  );
}

