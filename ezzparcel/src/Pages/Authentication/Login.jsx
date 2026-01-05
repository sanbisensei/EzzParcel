// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import SocialLogin from "./SocialLogin";
// import useAuth from "../../hooks/useAuth";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { signIn } = useAuth();
//   const [loginError, setLoginError] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state?.from || "/";

//   const onSubmit = (data) => {
//     signIn(data.email, data.password)
//       .then((result) => {
//         console.log(result.user);
//         navigate(from);
//       })
//       .catch((error) => {
//         setLoginError("Invalid email or password. Please try again.");
//       });
//   };
//   return (
//     <div>
//       <h1 className="items-center justify-center flex lg:text-4xl  lg:font-extrabold text-2xl font-bold">
//         Please Login
//       </h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <fieldset className="fieldset">
//           <label className="label">Email</label>
//           <input
//             type="email"
//             className="input"
//             placeholder="Email"
//             {...register("email")}
//           />
//           <label className="label">Password</label>
//           <input
//             type="password"
//             className="input"
//             placeholder="Password"
//             {...register("password", { required: true, minLength: 6 })}
//           />
//           {errors.password?.type === "required" && (
//             <p className="text-red-500">Password is required</p>
//           )}
//           {errors.password?.type === "minLength" && (
//             <p className="text-red-500">Password must be 6 characters</p>
//           )}

//           {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
//           <div>
//             <a className="link link-hover">Forgot password?</a>
//           </div>
//           <button className="btn btn-primary hover:btn-accent mt-4">
//             Login
//           </button>
//         </fieldset>
//         <p>
//           <small>
//             New to this website?{" "}
//             <Link
//               to="/register"
//               className="text-pretty font-bold px-1 text-[15px] hover:text-accent"
//             >
//               Register
//             </Link>
//           </small>
//         </p>
//       </form>
//       <SocialLogin></SocialLogin>
//     </div>
//   );
// };

// export default Login;

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const [loginError, setLoginError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from);
      })
      .catch((error) => {
        setLoginError("Invalid email or password. Please try again.");
      });
  };
  return (
    <div className="  min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <h1 className="text-2xl font-black uppercase mb-4 text-center border-b-4 border-black pb-3">
            Please Login
          </h1>
          <div>
            <fieldset className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border-4 border-black font-mono text-sm focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border-4 border-black font-mono text-sm focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  placeholder="Password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600 font-bold text-sm mt-2 uppercase">
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600 font-bold text-sm mt-2 uppercase">
                    Password must be 6 characters
                  </p>
                )}
              </div>

              {loginError && (
                <div className="bg-red-100 border-4 border-red-600 p-3">
                  <p className="text-red-600 font-bold text-sm uppercase">
                    {loginError}
                  </p>
                </div>
              )}

              {/* <div>
                <a className="text-sm font-bold uppercase underline hover:bg-black hover:text-white px-1 transition-colors cursor-pointer">
                  Forgot password?
                </a>
              </div> */}

              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-black text-white font-bold uppercase py-3 border-4 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 active:shadow-none"
              >
                Login
              </button>
            </fieldset>

            <div className="mt-6 pt-6 border-t-4 border-black">
              <p className="text-center">
                <span className="font-bold uppercase text-sm">
                  New to this website?{" "}
                  <Link
                    to="/register"
                    className="underline hover:bg-yellow-300 px-1 transition-colors"
                  >
                    Register
                  </Link>
                </span>
              </p>
            </div>
          </div>
          <div className="mt-6">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
