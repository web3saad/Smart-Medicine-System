/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

import Lottie from "lottie-react";
import login from "../../assets/animation/38435-register.json";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.path || "/";
  const { loginUser, setUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation((userData) => loginUser(userData), {
    onSuccess: (data) => {
      reset();
      const token = data.data.accessToken;
      const email = data.data.email;
      const id = data.data.student._id;
      const role = data?.data?.student.role;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("_id", id);
      localStorage.setItem("role", role);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User logged in successfully.",
        showConfirmButton: false,
        timer: 1500,
      });

      setUser({ token, email });
      navigate(from, { replace: true });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    mutation.mutate({ email, password });
  };

  return (
    <div className="main-container lg:px-20 py-20 md:hero min-h-screen   justify-items-center">
      <Helmet>
        <title> E-Medicine | Login 😍</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className=" text-center">
            <h1 className="text-5xl font-bold">
              Login <span className="text-blue-500">Here !</span>{" "}
            </h1>

            <div className="w-1/8 mb-10 md:mb-0 mx-auto">
              <Lottie animationData={login} loop={true} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:hero font-bold "
          >
            <div className="card flex-shrink-0 w-full   max-w-screen-sm  shadow-2xl ">
              <div className="card-body">
                {/* email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Email:</span>
                  </label>

                  <input
                    {...register("email", {
                      required: "Email is required",
                      validate: {
                        maxLength: (v) =>
                          v.length <= 50 ||
                          "The email should have at most 50 characters",
                        matchPattern: (v) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            v
                          ) || "Email address must be a valid address",
                      },
                    })}
                    name="email"
                    placeholder="Email"
                    className="input input-bordered  rounded-lg"
                  />

                  {errors.email?.message && (
                    <small className="text-red-600">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password : </span>
                  </label>
                  <input
                    {...register("password", { required: true })}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input input-bordered  rounded-lg"
                  />
                  {errors.password?.type === "required" && (
                    <small className="text-red-600">
                      Password is required!
                    </small>
                  )}
                </div>

                <label className="label">
                  <Link
                    to="/forgot-password"
                    className="label-text-alt text-blue-500 "
                  >
                    Forgot password?
                  </Link>
                </label>

                <div className="form-control mt-2">
                  {mutation.isLoading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                  ) : (
                    <button
                      type="submit"
                      className="btn bg-sky-800 hover:bg-sky-800 capitalize rounded-lg text-white mt-2"
                    >
                      Login
                    </button>
                  )}

                  <p className="text-sm font-bold mt-4">
                    Don't you have any Account ?{" "}
                    <Link to="/signup" className="text-blue-500 ">
                      Register
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
