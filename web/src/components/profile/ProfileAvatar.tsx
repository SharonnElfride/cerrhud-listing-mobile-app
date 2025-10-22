import {
  avatarUploadSchema,
  type AvatarUploadFormValues,
} from "@/forms/profileSchema";
import { updateSingleProfile, uploadAvatar } from "@/services/ProfilesService";
import type { AuthProps } from "@/shared/AuthProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

const ProfileAvatar = ({ user, loading }: AuthProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AvatarUploadFormValues>({
    resolver: zodResolver(avatarUploadSchema),
  });

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleUploadAvatar = async (data: AvatarUploadFormValues) => {
    if (!user) return toast.error("User not found");
    const file = data.avatar[0];

    try {
      const url = await uploadAvatar(user.id, file);
      await updateSingleProfile(user.id, { avatar: url });
      toast.success("Avatar updated successfully!");
      reset();
      setOpen(false);
      setPreview(`${url}?v=${Date.now()}`);
    } catch (err: any) {
      console.error(err);
      toast.error(`Failed to update avatar: ${err.message}`);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setPreview(null);
        }

        setOpen(open);
      }}
    >
      <div className="relative w-36 h-36">
        <div className="relative w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden">
          <Avatar className="w-full h-full rounded-full pointer-events-none">
            <AvatarImage
              src={preview ?? user?.avatar ?? undefined}
              alt="avatar"
            />
            <AvatarFallback
              style={{
                backgroundColor: user?.profile_color ?? "var(--color-primary)",
                color: "white",
                fontWeight: 500,
              }}
            >
              {loading ? <Spinner /> : user?.first_name?.charAt(0) ?? "X"}
            </AvatarFallback>
          </Avatar>

          <DialogTrigger asChild>
            <button
              type="button"
              className="absolute left-0 bottom-0 w-full h-[30%] 
                 bg-black/50 backdrop-blur-sm flex items-center justify-center 
                 rounded-b-full cursor-pointer transition-all duration-300 hover:bottom-[0.5%] hover:bg-black/70"
            >
              <CameraIcon className="w-6 h-6 text-white" />
            </button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent>
        <form
          onSubmit={handleSubmit(handleUploadAvatar)}
          className="flex flex-col gap-5"
        >
          <DialogHeader>
            <DialogTitle>Upload an avatar</DialogTitle>
            <DialogDescription>
              Allowed files extensions: <b>.png, .jpg, .jpeg, .svg, .webp</b>
              <br />
              Max file size: <b>1MB</b>
            </DialogDescription>
          </DialogHeader>

          <Field data-invalid={errors.avatar != null}>
            <Input
              {...register("avatar")}
              type="file"
              accept="image/*"
              onChange={handlePreview}
              aria-invalid={errors.avatar != null}
            />
            {errors.avatar && <FieldError>{errors.avatar.message}</FieldError>}
          </Field>

          {preview && (
            <div className="mt-2 flex flex-col gap-2 items-center">
              <p>Preview what your avatar will look like</p>
              <img
                src={preview}
                alt="preview"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setPreview(null)}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : "Confirm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileAvatar;
