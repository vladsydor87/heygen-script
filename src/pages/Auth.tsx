
import { AuthForm } from "@/components/AuthForm";

export default function Auth() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500">
      <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-md shadow-xl rounded-xl p-8">
        <AuthForm />
      </div>
    </div>
  );
}
