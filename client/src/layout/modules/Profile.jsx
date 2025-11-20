/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer } from "react-toastify";
import { getReq, putReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState([])
    const { userId, role } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { isSubmitting, errors },
    } = useForm();

    const newPassword = watch("newPassword");

    // Fetch user data
    useEffect(() => {
        const fetchData = async () => {
            const res = await getReq(`${API_ENDPOINTS.USERS}/${userId}`);
            setUser(res.user);
            setSkills(res.user.skills)
            reset(res.user);
        };
        fetchData();
    }, [userId]);

    // Submit handler
    const onSubmit = async (formData) => {
        await putReq(`${API_ENDPOINTS.USERS}/${userId}`, {
            ...formData,
            skills: skills
        });
    };

    const handleSkills = (e) => {
        const skills = e.target.value
        if (skills.trim()) {
            setSkills(skills.split(","))
        }
    }

    if (!user)
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="loader"></div>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200 ml-8 lg:ml-auto">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                {user?.name} Profile
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label>Name</Label>
                        <Input
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            {...register("phoneNumber", {
                                pattern: {
                                    value: /^(?:\+92|0)?3[0-9]{9}$/,
                                    message:
                                        "Enter a valid Pakistani phone number (e.g., 03XXXXXXXXX or +923XXXXXXXXX)",
                                },
                            })}
                        />
                        {errors.phoneNumber && (
                            <p className="text-sm text-red-500">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>

                    {role === "candidate" && <>
                        <div>
                            <Label>Address</Label>
                            <Input
                                {...register("address")}
                                placeholder="e.g. 123 Main St, City"
                            />
                        </div>

                        <div>
                            <Label>LinkedIn Profile</Label>
                            <Input
                                {...register("linkedinProfile", {
                                    pattern: {
                                        value:
                                            /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/,
                                        message: "Enter a valid LinkedIn profile URL",
                                    },
                                })}
                                placeholder="https://linkedin.com/in/username"
                            />
                            {errors.linkedinProfile && (
                                <p className="text-sm text-red-500">
                                    {errors.linkedinProfile.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Qualification</Label>
                            <Input
                                {...register("qualification")}
                                placeholder="e.g. BSc Computer Science"
                            />
                        </div>
                    </>}
                </div>

                {/* Skills */}
                {role === "candidate" && <>
                    <div>
                        <Label>Skills (comma separated)</Label>
                        <Input
                            {...register("skills", {
                                pattern: {
                                    value: /^\s*\w+(\s*\w+)*\s*,\s*\w+(\s*\w+)*(?:\s*,\s*\w+(\s*\w+)*)*\s*$/,
                                    message: "Enter skills separated by commas (e.g. React, Node.js, MongoDB)",
                                },
                            })}
                            onChange={handleSkills}
                            placeholder="e.g. React, Node.js, MongoDB"
                        />
                        {errors.skills && (
                            <p className="text-sm text-red-500">{errors.skills.message}</p>
                        )}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {skills.length > 0 && skills.map((item, ind) => {
                            return item.trim() && <p key={ind} className="p-1 px-4 bg-secondary/20 rounded-full">{item}</p>
                        })}
                    </div> </>}
                {/* Password Update */}
                <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-2 text-gray-700">
                        Change Password
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>New Password</Label>
                            <Input
                                type="password"
                                {...register("newPassword", {
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
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

                {/* Submit Button */}
                <div className="pt-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
