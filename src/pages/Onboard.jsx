import { BiSolidImageAdd } from "react-icons/bi";
import { IoIosInformationCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "../schemas/Profile.schema";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Onboard() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProfileSchema),
  });

  const { id } = useParams();

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      console.log(data.displayName);
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          displayName: data.displayName,
          email: id,
        }
      );
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setIsLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex w-1/2 bg-[#33BEE7] justify-center items-center">
        <h1 className="font-bold text-4xl text-white font-rubik">
          ALMOST DONE
        </h1>
      </div>
      <div className="md:w-1/2 flex flex-col justify-center items-center">
        <div className="w-full max-w-md flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 font-rubik">
            COMPLETE YOUR PROFILE
          </h2>
          <form
            className="flex flex-col gap-3 w-full items-center font-sans"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="">Profile Picture</label>
            <label
              className="border-1 border-gray-400 rounded-full h-60 w-60 flex items-center justify-center"
              htmlFor="profile-picture"
            >
              <BiSolidImageAdd size={70} />
            </label>
            <input
              className="hidden"
              type="file"
              name="Profile Picture"
              id="profile-picture"
            />
            <div className="wrapper-custom">
              <label
                htmlFor="display-name"
                className="label-custom flex gap-2 items-center"
              >
                Display Name
                <span>
                  <IoIosInformationCircle
                    color={"#33BEE7"}
                    size={20}
                    title="This is what other users see when they don't have you on their list"
                  />
                </span>
              </label>
              <input
                {...register("displayName")}
                type="text"
                id="display-name"
                name="displayName"
                placeholder="Display Name"
                className="input-custom"
              />
              {errors.displayName && (
                <p className="error-message">{errors.displayName.message}</p>
              )}
            </div>
            <button
              className="bg-sky-blue py-2 px-3 rounded-md text-white font-sans disabled:bg-blue-200 w-full flex justify-center mt-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-6 w-6 border-2 border-t-sky-400 border-blue-300 animate-spin rounded-full"></div>
              ) : (
                <span>Complete Registration</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
