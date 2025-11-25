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
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Profile = () => {
    const [skills, setSkills] = useState([]);
    const { userId, role, user } = useAuth();
    const [value, setValu] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { isSubmitting, errors },
    } = useForm();

    const newPassword = watch("newPassword");


    useEffect(() => {
        const fetchData = async () => {
            const res = await getReq(`${API_ENDPOINTS.USERS}/${userId}`);
            setSkills(res.user.skills);
            reset(res.user);

            if (res?.user?.phoneNumber) {
                let phone = String(res.user.phoneNumber);
                if (!phone.startsWith("+")) {
                    phone = "+" + phone;
                }
                setValu(phone);
                setValue("phoneNumber", phone);
            }
        };

        fetchData();
    }, [userId]);

    const onSubmit = async (formData) => {
        await putReq(`${API_ENDPOINTS.USERS}/${userId}`, {
            ...formData,
            skills: skills,
        });
    };

    const handleSkills = (e) => {
        const skills = e.target.value;
        setSkills(skills.split(","));
    };

    if (!user)
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="loader"></div>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto mt-10 py-6 shadow-lg rounded-2xl border border-foreground/60 ml-8 lg:ml-auto">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-3xl font-bold mb-8 p-4 border-b border-foreground/60 text-foreground text-center">
                {user?.name} Profile
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                    <div>
                        <Label>Name</Label>
                        <Input
                            className="border-foreground/60 text-foreground/70"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <Label>Email</Label>
                        <Input
                            className="border-foreground/60 text-foreground/70"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value:
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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

                        <PhoneInput
                            international
                            defaultCountry="US"
                            value={value}
                            onChange={(val) => {
                                setValu(val);
                                setValue("phoneNumber", val, { shouldValidate: true });
                            }}
                            className="text-foreground bg-transparent border border-foreground/60 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter phone number"
                        />

                        {errors.phoneNumber && (
                            <p className="text-red-500 text-sm">
                                {errors.phoneNumber.message}
                            </p>
                        )}

                        <Input
                            type="hidden"
                            {...register("phoneNumber", {
                                required: "Phone number is required",
                                validate: (val) =>
                                    isValidPhoneNumber(val) || "Invalid phone number",
                            })}
                        />
                    </div>

                    {role === "candidate" && (
                        <>
                            <div>
                                <Label>Address</Label>
                                <Input
                                    className="border-foreground/60 text-foreground/70"
                                    {...register("address")}
                                    placeholder="e.g. 123 Main St, City"
                                />
                            </div>

                            <div>
                                <Label>LinkedIn Profile</Label>
                                <Input
                                    className="border-foreground/60 text-foreground/70"
                                    {...register("linkedinProfile", {
                                        pattern: {
                                            value:
                                                /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/,
                                            message:
                                                "Enter a valid LinkedIn profile URL",
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
                                    className="border-foreground/60 text-foreground/70"
                                    {...register("qualification")}
                                    placeholder="e.g. BSc Computer Science"
                                />
                            </div>
                        </>
                    )}
                </div>

                {role === "candidate" && (
                    <div className="px-6 space-y-6">
                        <div>
                            <Label>Skills (comma separated)</Label>
                            <Input
                                className="border-foreground/60 text-foreground/70"
                                {...register("skills", {
                                    pattern: {
                                        value:
                                            /^\s*\w+(\s*\w+)*\s*,\s*\w+(\s*\w+)*(?:\s*,\s*\w+(\s*\w+)*)*\s*$/,
                                        message:
                                            "Enter skills separated by commas (e.g. React, Node.js, MongoDB)",
                                    },
                                })}
                                onChange={handleSkills}
                                placeholder="e.g. React, Node.js, MongoDB"
                            />
                            {errors.skills && (
                                <p className="text-sm text-red-500">
                                    {errors.skills.message}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {skills.length > 0 &&
                                skills.map(
                                    (item, ind) =>
                                        item.trim() && (
                                            <p
                                                key={ind}
                                                className="p-1 px-4 bg-secondary/20 rounded-full"
                                            >
                                                {item}
                                            </p>
                                        )
                                )}
                        </div>
                    </div>
                )}

                <div className="border-t p-6">
                    <h3 className="font-semibold pb-8 text-foreground text-center">
                        Change Password
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>New Password</Label>
                            <Input
                                className="border-foreground/60 text-foreground/70"
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
                                className="border-foreground/60 text-foreground/70"
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
                <div className="p-6">
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
