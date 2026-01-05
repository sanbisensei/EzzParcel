// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import { Link, useNavigate } from "react-router";
// import SocialLogin from "./SocialLogin";
// import axios from "axios";
// import { useState } from "react";
// import useAxios from "../../hooks/useAxios";

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { createUser, updateUserProfile } = useAuth();
//   const navigate = useNavigate();
//   const [profilePic, setProfilePic] = useState("");
//   const axiosInstance = useAxios();
//   const onSubmit = (data) => {
//     console.log(data);
//     createUser(data.email, data.password)
//       .then(async (result) => {
//         console.log(result.user);
//         navigate("/");
//         //Update userinfo in the database
//         const userInfo = {
//           email: data.email,
//           role: "user", //default role
//           created_at: new Date().toISOString(),
//           last_login: new Date().toISOString(),
//         };
//         const userRes = await axiosInstance.post("/users", userInfo);
//         console.log(userRes.data);
//         //Upload user profile in firebase
//         const UserProfile = {
//           displayName: data.name,
//           photoURL: profilePic,
//         };
//         updateUserProfile(UserProfile)
//           .then(() => {
//             console.log("Profile Updated");
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleImageUpload = async (event) => {
//     const image = event.target.files[0];
//     console.log(image);
//     const formData = new FormData();
//     formData.append("image", image);
//     const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
//       import.meta.env.VITE_image_upload_key
//     }`;
//     const res = await axios.post(imageUploadUrl, formData);
//     setProfilePic(res.data.data.url);
//   };

//   return (
//     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//       <div className="card-body">
//         <h1 className="text-5xl font-bold">Create an Account</h1>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <fieldset className="fieldset">
//             {/* IMAGE FIELD */}
//             <label className="label">Upload Image</label>
//             <input
//               type="file"
//               onChange={handleImageUpload}
//               className="input"
//               placeholder="Your Profile Picture"
//             ></input>

//             {/* NAME FIELD */}
//             <label className="label">Name</label>
//             <input
//               type="text"
//               {...register("name", { required: true })}
//               className="input"
//               placeholder="Your Name"
//             />
//             {errors.name?.type === "required" && (
//               <p className="text-red-500">Name is required</p>
//             )}

//             {/* EMAIL FIELD */}
//             <label className="label">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: true })}
//               className="input"
//               placeholder="Email"
//             />
//             {errors.email?.type === "required" && (
//               <p className="text-red-500">Email is required</p>
//             )}
//             {/* PASSWORD FIELD */}
//             <label className="label">Password</label>
//             <input
//               type="password"
//               {...register("password", { required: true, minLength: 6 })}
//               className="input"
//               placeholder="Password"
//             />
//             {errors.password?.type === "required" && (
//               <p className="text-red-500">Password is required</p>
//             )}
//             <div>
//               <a className="link link-hover">Forgot password?</a>
//             </div>
//             <button
//               type="submit"
//               className="btn btn-primary hover:btn-accent mt-4"
//             >
//               Register
//             </button>
//           </fieldset>
//           <p>
//             <small>
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-pretty font-bold px-1 text-[15px] hover:text-accent"
//               >
//                 Login
//               </Link>
//             </small>
//           </p>
//         </form>
//         <SocialLogin></SocialLogin>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);
        navigate("/");
        //Update userinfo in the database
        const userInfo = {
          email: data.email,
          role: "user", //default role
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);
        //Upload user profile in firebase
        const UserProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(UserProfile)
          .then(() => {
            console.log("Profile Updated");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <h1 className="text-2xl font-black uppercase mb-4 text-center border-b-4 border-black pb-3">
            Create an Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="space-y-4">
              {/* IMAGE FIELD */}
              <div>
                <label className="block text-xs font-bold uppercase mb-1 tracking-wider">
                  Upload Image
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border-4 border-black font-mono text-sm focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all file:mr-4 file:py-1 file:px-3 file:border-0 file:font-bold file:bg-black file:text-white file:uppercase file:text-xs"
                  placeholder="Your Profile Picture"
                />
              </div>

              {/* NAME FIELD */}
              <div>
                <label className="block text-xs font-bold uppercase mb-1 tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 border-4 border-black font-mono text-sm focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  placeholder="Your Name"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-600 font-bold text-sm mt-2 uppercase">
                    Name is required
                  </p>
                )}
              </div>

              {/* EMAIL FIELD */}
              <div>
                <label className="block text-xs font-bold uppercase mb-1 tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-3 py-2 border-4 border-black font-mono text-sm focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-600 font-bold text-sm mt-2 uppercase">
                    Email is required
                  </p>
                )}
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <label className="block text-xs font-bold uppercase mb-1 tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                  className="w-full px-3 py-2 border-4 border-black font-mono text-sm focus:outline-none focus:translate-x-1 focus:translate-y-1 focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600 font-bold text-sm mt-2 uppercase">
                    Password is required
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white font-bold uppercase py-3 border-4 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 active:shadow-none"
              >
                Register
              </button>
            </fieldset>
            <div className="mt-6 pt-6 border-t-4 border-black">
              <p className="text-center">
                <span className="font-bold uppercase text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="underline hover:bg-yellow-300 px-1 transition-colors"
                  >
                    Login
                  </Link>
                </span>
              </p>
            </div>
          </form>
          <div className="mt-6">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
