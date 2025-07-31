// app/auth/layout.js
export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl sm:p-10">
        {children}
      </div>
    </div>
  );
}
