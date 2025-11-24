import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINTS } from "../../config/api";
import { postReq, getReq } from "../../axios/axios";
import { FaGavel } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setRole , checkSession} = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const res = await getReq(API_ENDPOINTS.DASHBOARD);
      if (res?.user?.role) {
        navigate("/");
      }
    }

    checkSession();
  }, [navigate]);




  // ✅ Unified Login Handler
  const onSubmit = async (formData) => {
    setLoading(true);
    const { email, password } = formData;
    const payload = { email, password };

    const res = await postReq(API_ENDPOINTS.LOGIN, payload);
    if (res?.user?.role) {
      setRole(res.user.role);
      checkSession()
      setLoading(false);
      reset();
      navigate("/");
    }
    else {
      setLoading(false);
    }
  }


  return (
    <div className="px-4 bg-background bg-[radial-gradient(circle_at_top_center,_#0B1138,_transparent_70%)]">
      <ToastContainer position="top-right" autoClose={3000} />
     <Link to="/" className="flex items-center space-x-2 pt-8">
        <FaGavel className="text-blue-600 text-3xl" />
        <span className="text-2xl font-bold text-blue-600">Gavel</span>
      </Link>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-6 rounded-lg shadow-md border border-foreground/60">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <div className="text-right mt-1">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white transition ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
