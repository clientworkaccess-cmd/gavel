import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postReq } from "../../axios/axios";
import API_ENDPOINTS from "../../config/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";


const ContactSection = () => {
  const [captchaValue, setCaptchaValue] = useState()
  const [value, setValu] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (!captchaValue) {
      toast.warn("Please complete captcha")
      return
    }
    await postReq(API_ENDPOINTS.SEND_EMAIL, {
      email: data.email,
      subject: `Contact Form Submission from ${data.name}`,
      text: data.details,
      phone: data.phone,
    });
    setValu('')
    reset();
  };

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <Card className="shadow-md border border-gray-200 bg-transparent">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Contact Us
          </CardTitle>
          <p className="text-center text-gray-500 mt-2">
            We’d love to hear from you! Fill in your details and we’ll get back to you soon.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Your Name</Label>
              <Input
                className="border-foreground/60"
                id="name"
                placeholder="John Doe"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Your Email</Label>
              <Input
                className="border-foreground/60"
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneInput
                international
                defaultCountry="US"
                value={value}
                onChange={(val) => {
                  setValu(val);
                  setValue("phone", val, { shouldValidate: true });
                }}
                className="text-foreground bg-transparent border border-foreground/60 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />

              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone.message}
                </p>
              )}

              <Input
                type="hidden"
                {...register("phone", {
                  required: "Phone number is required",
                  validate: (val) =>
                    isValidPhoneNumber(val) || "Invalid phone number",
                })}
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <Label htmlFor="details">Message</Label>
              <Textarea
                className="border-foreground/60 min-h-30 max-h-100"
                id="details"
                rows={5}
                placeholder="Write your message here..."
                {...register("details", { required: "Message cannot be empty" })}
              />
              {errors.details && (
                <p className="text-red-500 text-sm">{errors.details.message}</p>
              )}
            </div>

            <ReCAPTCHA
              sitekey={import.meta.env.VITE_CAPTCHA_KEY}
              onChange={(token) => setCaptchaValue(token)}
            />

            <Button
              type="submit"
              variant="outline"
              disabled={isSubmitting}
              className="w-full font-semibold py-2"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default ContactSection;
