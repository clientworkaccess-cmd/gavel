import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToastContainer } from "react-toastify";
import { useAuth } from "@/layout/context/AuthContext";
import { getReq, postReq } from "@/axios/axios";
import API_ENDPOINTS from "@/config/api";
import { useEffect } from "react";

const ContactAdmin = () => {
    const {user} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

useEffect(()=>{
    const fetchCompany = async () => {
        const comp = await getReq(API_ENDPOINTS.COMPANY)
        const found = comp.find(item => user.company.includes(item._id))
        if (found) {
            user.company = found.name            
        }
    }
    fetchCompany()
},[])

  const onSubmit = async (data) => {
    const payload = {
        name: user.name,
        email: user.email,
        subject: data.subject,
        message: data.message,
        company: user?.company
    }
    await postReq(API_ENDPOINTS.SEND_EMAIL_ADMIN , payload)
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center pl-7 py-10 ">
      <ToastContainer />

      {/* CARD */}
      <div className="
        w-full max-w-xl 
        backdrop-blur-xl 
        bg-white/5 
        border border-white/10 
        shadow-2xl 
        rounded-2xl p-3
        min-[480px]:p-8 
        text-gray-200
      ">
        
        <h2 className="text-xl min-[480px]:text-3xl font-bold mb-8 text-center text-blue-400 tracking-wide">
          Contact Admin
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* SUBJECT */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium">
              Subject
            </Label>

            <Textarea
              id="subject"
              placeholder="Enter subject..."
              className="
                bg-white/5 
                border border-white/20 
                text-gray-200 
                placeholder:text-gray-400
                focus:ring-2 focus:ring-blue-500 
                min-h-10 max-h-20
              "
              {...register("subject", { required: "Subject is required" })}
            />

            {errors.subject && (
              <p className="text-red-400 text-sm">{errors.subject.message}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Message
            </Label>

            <Textarea
              id="message"
              placeholder="Write your message..."
              className="
                bg-white/5 
                border border-white/20 
                text-gray-200 
                placeholder:text-gray-400
                focus:ring-2 focus:ring-blue-500 
                min-h-40 max-h-60
              "
              {...register("message", { required: "Message is required" })}
            />

            {errors.message && (
              <p className="text-red-400 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full py-3 
              bg-secondary/80 hover:bg-secondary
              text-white 
              font-semibold 
              rounded-lg 
            "
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactAdmin;
