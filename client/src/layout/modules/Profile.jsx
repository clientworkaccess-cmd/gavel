/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getReq, putReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const [user, setUser] = useState(null);
    const { userId } = useAuth()
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { isSubmitting, errors },
    } = useForm();
    const newPassword = watch("newPassword");

    // ✅ Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getReq(`${API_ENDPOINTS.USERS}/${userId}`);
            setUser(res.user);
            reset(res.user);
        };
        fetchUser();
    }, [userId]);


    // ✅ Submit handler
    const onSubmit = async (formData) => {
        await putReq(`${API_ENDPOINTS.USERS}/${userId}`, formData);
    };

    if (!user) return <div className="min-h-screen flex justify-center items-center"><div className="loader"></div></div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">{user?.name} Profile</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <Label>Name </Label>
                    <Input {...register("name", { required: "Name is required" })} />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <Label>Email </Label>
                    <Input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <Label>Phone Number</Label>
                    <Input
                        type="text"
                        {...register("phoneNumber", {
                            pattern: {
                                value: /^[0-9]{11}$/,
                                message: "Phone must be an 11-digit number",
                            },
                        })}
                    />
                    {errors.phoneNumber && (
                        <p className="text-sm text-red-500">
                            {errors.phoneNumber.message}
                        </p>
                    )}
                </div>

                {/* Password Update (Optional) */}
                <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-2 text-gray-700">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>New Password</Label>
                            <Input
                                type="password"
                                {...register("newPassword", {
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />
                            {errors.newPassword && (
                                <p className="text-sm text-red-500">
                                    {errors.newPassword.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                {...register("confirmPassword", {
                                    validate: (value) =>
                                        !newPassword ||
                                        value === newPassword ||
                                        "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
