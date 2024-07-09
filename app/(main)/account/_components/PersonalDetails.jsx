"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useFormState } from "react-hook-form";
import { updateUserInfo } from "@/actions/updateUserInfo";
import { toast } from "sonner";
const PersonalDetails = ({ userInfo }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: userInfo,
  });
  const { isSubmitting } = useFormState({ control });

  const onSubmit = async (data) => {
    const result = await updateUserInfo(data.email, data);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
      <h5 className="text-lg font-semibold mb-4">Personal Detail :</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <Label html="firstName" className="mb-2 block">
              First Name : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              placeholder="First Name:"
              id="firstName"
              {...register("first_name")}
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Last Name : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Last Name:"
              {...register("last_name")}
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Your Email : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              readOnly
            />
          </div>
          <div>
            <Label className="mb-2 block">Designation :</Label>
            <Input
              id="designation"
              type="text"
              placeholder="designation :"
              {...register("designation")}
            />
          </div>
        </div>
        {/*end grid*/}
        <div className="grid grid-cols-1">
          <div className="mt-5">
            <Label className="mb-2 block">Description :</Label>
            <Textarea
              id="comments"
              placeholder="Message :"
              {...register("bio")}
            />
          </div>
        </div>
        {/*end row*/}
        <Button className={`mt-5 cursor-pointer `} asChild>
          <input
            type="submit"
            name="send"
            value="Save Changes"
            disabled={isSubmitting}
          />
        </Button>
      </form>
      {/*end form*/}
    </div>
  );
};

export default PersonalDetails;
