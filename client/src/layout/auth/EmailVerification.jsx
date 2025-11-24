import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { postReq } from "../../axios/axios";
import "react-toastify/dist/ReactToastify.css";
import API_ENDPOINTS from "../../config/api";

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // ✅ Verify Email Function
    const onSubmit = async (formData) => {
        setLoading(true);
        const payload = { token, otp: formData.otp };
        const res = await postReq(`${API_ENDPOINTS.VERIFY_EMAIL}/${token}`, payload);
        reset();
        navigate(res.redirectUrl)
        setLoading(false);
    };

    // ✅ Resend OTP Function
    const handleResend = async () => {
        setResending(true);
            await postReq(`${API_ENDPOINTS.RESEND_VERIFICATION}/${token}`);
            setResending(false);
    };

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md p-8 rounded-lg border border-foreground/60">
                    <h2 className="text-2xl font-bold text-center text-secondary mb-6">
                        Verify Your Email
                    </h2>

                    <ToastContainer />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* OTP Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-foreground/40 mb-1">
                                Enter OTP Code
                            </label>
                            <input
                                type="text"
                                {...register("otp", {
                                    required: "OTP is required",
                                    minLength: { value: 6, message: "OTP must be 6 digits" },
                                    maxLength: { value: 6, message: "OTP must be 6 digits" },
                                })}
                                placeholder="Enter 6-digit OTP"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg"
                            />
                            {errors.otp && (
                                <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
                            )}
                        </div>

                        {/* Verify Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-secondary text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Verifying..." : "Verify Email"}
                        </button>
                    </form>

                    {/* Resend Button */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>Didn’t get the code?</p>
                        <button
                            onClick={handleResend}
                            disabled={resending}
                            className="text-secondary font-medium mt-2 hover:underline disabled:text-gray-400"
                        >
                            {resending ? "Resending..." : "Resend Code"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
