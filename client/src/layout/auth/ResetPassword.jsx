import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINTS } from "../../config/api";
import { postReq } from "../../axios/axios";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // ✅ Submit new password
    const onSubmit = async (data) => {
        if (!token) {
            toast.error("Invalid or missing reset token");
            return;
        }

        setLoading(true);
        const payload = {
            newPassword: data.password,
        };

        const res = await postReq(`${API_ENDPOINTS.RESET_PASSWORD}/${token}`, payload);
        setTimeout(() => navigate(res.redirectUrl), 2000);
        setLoading(false);
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md p-8 rounded-lg border border-foreground/60">
                    <h2 className="text-2xl font-bold text-center text-secondary mb-6">
                        Reset Password
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* New Password */}
                        <div className="mb-4 relative">
                            <label className="block text-sm font-medium text-foreground/40 mb-1">
                                New Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                placeholder="********"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-8 text-gray-500 hover:text-foreground/40"
                            >
                                {!showPassword ? <EyeOff /> : <Eye />}
                            </button>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-foreground/40 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === watch("password") || "Passwords do not match",
                                })}
                                placeholder="********"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded-md text-white transition ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-secondary hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Back to{" "}
                        <Link to="/login" className="text-secondary hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
