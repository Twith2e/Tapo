import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
  const handleLogin = () => {};
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-[#33BEE7] font-rubik items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Welcome Back!</h1>
      </div>
      <div className="flex flex-col justify-center items-center md:w-1/2 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 font-rubik">
            Sign In
          </h2>
          <form onSubmit={handleLogin} className="space-y-4 font-sans">
            <div>
              <label htmlFor="login-email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="login-email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-400"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="login-password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#33BEE7] text-white rounded-md hover:bg-[#228cac] transition-colors duration-200"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600 font-sans">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
