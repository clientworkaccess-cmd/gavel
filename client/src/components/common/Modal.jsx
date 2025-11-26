/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { getReq, postReq, putReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Modal = ({ type, show, setShow, data, variant, entity }) => {
    const [companies, setCompanies] = useState([]);
    const [value, setValu] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { isSubmitting, errors },
    } = useForm();

    useEffect(() => {
        if (data?.phoneNumber) {
            let phone = String(data?.phoneNumber);
            if (!phone.startsWith("+")) {
                phone = "+" + phone;
            }
            setValu(phone);
            setValue("phoneNumber", phone);
        }
        if (data) reset(data);
    }, [data]);

    useEffect(() => {
        if (variant !== "company") {
            const fetchCompanies = async () => {
                const res = await getReq(API_ENDPOINTS.COMPANIES_NAMES);
                setCompanies(res);
            };
            fetchCompanies();
        }
    }, [variant]);

    // ✅ Submit Handlers
    const handleAdd = async (formData) => {
        if (variant === "company") {
            await postReq(API_ENDPOINTS.COMPANY, formData);
        } else if (variant === "position") {
            await postReq(API_ENDPOINTS.POSITION, formData);
        } else if (variant === "user") {
            await postReq(API_ENDPOINTS.SIGNUP, formData);
        }
        setShow(false);
        reset();
    };

    const handleEdit = async (formData) => {
        if (variant === "company") {
            await putReq(`${API_ENDPOINTS.COMPANY}/${data._id}`, formData);
        } else if (variant === "position") {
            await putReq(`${API_ENDPOINTS.POSITION}/${data._id}`, formData);
        } else if (variant === "user") {
            await putReq(`${API_ENDPOINTS.USERS}/${data._id}`, formData);
        }
        setShow(false);
        reset();
    };

    // ✅ Dynamic Form Fields (based on model)
    const renderFields = () => {
        if (variant === "company") {
            return (
                <>
                    <div>
                        <Label>Name </Label>
                        <Input className="border-foreground/60 text-foreground/50" {...register("name", { required: true })} />
                    </div>
                    <div>
                        <Label>Address</Label>
                        <Input className="border-foreground/60 text-foreground/50" {...register("address")} />
                    </div>
                    <div>
                        <Label>Website</Label>
                        <Input className="border-foreground/60 text-foreground/50"
                            {...register("website", {
                                pattern: {
                                    value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\S*)?$/,
                                    message: "Enter a valid website URL (e.g. https://example.com)",
                                },
                            })}
                        />
                        {errors.website && (
                            <p className="text-sm text-red-500">{errors.website.message}</p>
                        )}
                    </div>
                    <div>
                        <Label>Industry</Label>
                        <Input className="border-foreground/60 text-foreground/50" {...register("industry")} />
                    </div>
                </>
            );
        } else if (variant === "position") {
            return (
                <>
                    <div>
                        <Label>Name </Label>
                        <Input className="border-foreground/60 text-foreground/50" {...register("name", { required: true })} />
                    </div>
                    <div>
                        <Label>Position Description</Label>
                        <Textarea className="max-h-30 border-foreground/60 text-foreground/50" {...register("positionDescription")} />
                    </div>
                    <div>
                        <Label>Company </Label>
                        <Select
                            onValueChange={(val) => setValue("company", val)}
                            defaultValue={data?.company?._id || ""}
                        >
                            <SelectTrigger className="w-full border-foreground/60 text-foreground/50">
                                <SelectValue placeholder="Select company" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies?.map((c) => (
                                    <SelectItem key={c._id} value={c._id}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Category</Label>
                        <Select
                            onValueChange={(val) => setValue("category", val)}
                            defaultValue={data?.category || ""}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Legal">Legal</SelectItem>
                                <SelectItem value="Hospitality">Hospitality</SelectItem>
                                {/* <SelectItem value="Professional Services">Professional Services</SelectItem> */}
                            </SelectContent>
                        </Select>
                    </div>
                    {type === "edit" && <div>
                        <Label>Status</Label>
                        <Select
                            onValueChange={(val) => setValue("status", val)}
                            defaultValue={data?.status || "open"}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>}
                    <div>
                        <Label>Red Flag</Label>
                        <Input className="border-foreground/60 text-foreground/50" {...register("redFlag")} />
                    </div>
                </>
            );
        } else if (variant === "user") {
            return (
                <>
                    <div>
                        <Label>Name </Label>
                        <Input className="border-foreground/60 text-foreground/50" {...register("name", { required: true })} />
                    </div>
                    <div>
                        <Label>Email </Label>
                        <Input className="border-foreground/60 text-foreground/50" type="email" {...register("email", { required: true })} />
                    </div>
                    {type === "add" && (
                        <div>
                            <Label>Password </Label>
                            <Input className="border-foreground/60 text-foreground/50" type="password" {...register("password", { required: true })} />
                        </div>
                    )}
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
                    <div>
                        <Label>Role</Label>
                        <Input className="border-foreground/60 text-foreground/50" {...register("role")} />
                    </div>
                    {entity !== "admins" && data?.role !== "admin" && <div>
                        <Label>Company</Label>
                        <Select
                            onValueChange={(val) => setValue("company", [val])}
                            defaultValue={data?.company?.[0]?._id || ""}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select company" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies?.map((c) => (
                                    <SelectItem key={c._id} value={c._id}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>}
                </>
            );
        }
    };

    return (
        <Dialog open={show} onOpenChange={(open) => !open && setShow(false)}>
            <DialogContent  onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {type === "add" ? `Add ${variant}` : `Edit ${variant}`}
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(type === "add" ? handleAdd : handleEdit)}
                    className="space-y-4 mt-2"
                >
                    {renderFields()}
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting} variant="secondary">
                            {isSubmitting ? "Saving..." : type === "add" ? "Add" : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
