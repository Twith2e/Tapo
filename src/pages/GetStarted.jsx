import OrDivider from "../components/OrDivider";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GetStarted() {
  const handleSubmit = () => {};
  const handleGoogleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/request");
      if (response.data.url) {
        const { url } = response.data;
        location.href = url;
        GoogleCallback();
      } else {
        console.error("Failed to get google signup url");
      }
    } catch (error) {
      console.error("Error during google signup:", error);
    }
  };

  return (
    <div className="h-screen">
      <h2 className="w-full text-center text-[#33BEE7]">Sign Up to Tapo</h2>
      <form
        onSubmit={handleSubmit}
        className="lg:w-[60%] md:w-[80%] w-[90%] justify-center mx-auto flex flex-col gap-4"
      >
        <div className="form-group flex flex-col gap-2">
          <label className="text-[#33BEE7]" htmlFor="">
            Display Name
          </label>
          <input className="form-control py-2" type="text" />
        </div>
        <div className="form-group flex flex-col gap-2">
          <label className="text-[#33BEE7]" htmlFor="">
            Email
          </label>
          <input className="form-control py-2" type="email" />
        </div>
        <div className="form-group flex flex-col gap-2">
          <label className="text-[#33BEE7]" htmlFor="">
            Password
          </label>
          <input className="form-control py-2" type="password" />
        </div>
        <div className="form-group flex flex-col gap-2">
          <label className="text-[#33BEE7]" htmlFor="">
            Confirm Password
          </label>
          <input className="form-control py-2" type="password" />
        </div>
      </form>
      <div className="md:w-[20%] w-[80%] mx-auto">
        <OrDivider />
      </div>
      <div className="flex flex-col items-center mt-4 w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
        <div className="w-full flex items-center justify-center mb-4">
          <button
            className="flex items-center gap-2 border-2 border-gray-300 hover:bg-[#33bde736] active:bg-[#fff] px-4 py-2 rounded-full w-full text-center justify-center"
            onClick={handleGoogleSignup}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span className="font-medium">Continue with Google</span>
          </button>
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="text-[#33BEE7] font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
