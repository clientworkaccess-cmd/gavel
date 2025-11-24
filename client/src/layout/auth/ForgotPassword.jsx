import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { API_ENDPOINTS } from "../../config/api";
import "react-toastify/dist/ReactToastify.css";
import { postReq } from "../../axios/axios";

const ForgotPassword = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        await postReq(API_ENDPOINTS.FORGOT_PASSWORD, { email: data.email });
        reset();
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md p-8 rounded-lg border border-foreground/60">
                    <h2 className="text-2xl font-bold text-center text-secondary mb-6">
                        Forgot Password
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-foreground/40 mb-1">
                                Enter your email
                            </label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 rounded-md text-white transition ${isSubmitting ? "bg-gray-400" : "bg-secondary hover:bg-blue-700"
                                }`}
                        >
                            {isSubmitting ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Remember your password?{" "}
                        <a href="/login" className="text-secondary hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
