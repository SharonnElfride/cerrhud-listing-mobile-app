import type { AuthProps } from "@/shared/AuthProps";
import { CameraIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Spinner } from "../ui/spinner";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const ProfileAvatar = ({ user, loading }: AuthProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image must be smaller than 1 MB");
      e.target.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    // TODO send file to supa storage service
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-36 h-36">
      <div className="relative w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden">
        <Avatar className="w-full h-full rounded-full pointer-events-none">
          <AvatarImage src={preview ?? user?.avatar ?? ""} alt="avatar" />
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

        <button
          type="button"
          className="absolute left-0 bottom-0 w-full h-[30%] 
                 bg-black/50 backdrop-blur-sm flex items-center justify-center 
                 rounded-b-full cursor-pointer transition-all duration-300 hover:bottom-[0.5%] hover:bg-black/70"
          onClick={handleClick}
        >
          <CameraIcon className="w-6 h-6 text-white" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfileAvatar;
