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
import { toast } from "react-toastify";
import TextEditor from "./TextEditor";

const Modal = ({ type, show, setShow, data, variant, entity }) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false)
    const [value, setValu] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (type === "edit" && data?.phoneNumber) {
            let phone = String(data?.phoneNumber);
            if (!phone.startsWith("+")) {
                phone = "+" + phone;
            }
            setValu(phone);
            setValue("phoneNumber", phone);
            data.phoneNumber = phone
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
        setLoading(true)
        if (variant === "company") {
            await postReq(API_ENDPOINTS.COMPANY, formData);
        } else if (variant === "position") {
            await postReq(API_ENDPOINTS.POSITION, formData);
        } else if (variant === "user") {
            if (entity !== "admins" && formData.role === "admin") {
                toast.error("Cannot add role admin")
                return
            }
            if (entity === "admins") {
                formData.role = "admin";
            }
            await postReq(API_ENDPOINTS.SIGNUP, formData);
        }
        setLoading(false)
        setShow(false);
        reset();
    };

    const handleEdit = async (formData) => {
        setLoading(true)
        if (variant === "company") {
            await putReq(`${API_ENDPOINTS.COMPANY}/${data._id}`, formData);
        } else if (variant === "position") {
            await putReq(`${API_ENDPOINTS.POSITION}/${data._id}`, formData);
        } else if (variant === "user") {
            if (entity !== "admins" && formData.role === "admin") {
                toast.error("Cannot change role to admin")
                return
            }
            await putReq(`${API_ENDPOINTS.USERS}/${data._id}`, formData);
        }
        setLoading(false)
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
                        <Input className="border-foreground/60 text-foreground/50" {...register("name", { required: "This field is required" })} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
                        <Label>Job Title </Label>
                        <Input className="border-foreground/60 text-foreground/50" {...register("name", { required: "This field is required" })} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <Label>Job Description</Label>
                        <TextEditor onChange={(html) => setValue("positionDescription", html)} data={data?.positionDescription} />
                        <input type="hidden" {...register("positionDescription", { required: "This field is required" })} />
                        {errors.positionDescription && <p className="text-red-500 text-sm">{errors.positionDescription.message}</p>}
                    </div >
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
                        <input type="hidden" {...register("company", { required: "This field is required" })} />
                        {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                    </div>
                    <div>
                        <Label>Category</Label>
                        <Select
                            onValueChange={(val) => setValue("category", val )}
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
                        <input type="hidden" {...register("category", { required: "This field is required" })} />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>
                    {
                        type === "edit" && <div>
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
                        </div>
                    }
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
                        <Input className="border-foreground/60 text-foreground/50" {...register("name", { required: "This field is required" })} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <Label>Email </Label>
                        <Input className="border-foreground/60 text-foreground/50" type="email" {...register("email", { required: "This field is required" })} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    {type === "add" && (
                        <div>
                            <Label>Password </Label>
                            <Input className="border-foreground/60 text-foreground/50" type="password" {...register("password", { required: "This field is required" })} />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
                        {entity !== "admins" && data?.role !== "admin" && <>
                            <Label>Role</Label>
                            <Input className="border-foreground/60 text-foreground/50" {...register("role")} />
                        </>}
                    </div>
                    {entity !== "admins" && data?.role !== "admin" && type === "add" && <div>
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
        <Dialog open={show} onOpenChange={(open) => !open && setShow(false)} >
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {type === "add" ? `Add ${variant}` : `Edit ${variant}`}
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(type === "add" ? handleAdd : handleEdit)}
                    className="space-y-4 mt-2 "
                >
                    {renderFields()}
                    <DialogFooter>
                        <Button type="submit" disabled={loading} variant="secondary">
                            {loading ? "Saving..." : type === "add" ? "Add" : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
