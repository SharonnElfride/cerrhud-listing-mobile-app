import { profileSchema, type ProfileFormValues } from "@/forms/profileSchema";
import { updateSingleProfile } from "@/services/ProfilesService";
import {
  updateSupabaseAuthUser,
  type SupabaseAuthUser,
} from "@/services/SupabaseService";
import type { AuthProps } from "@/shared/AuthProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import {
  ColorPicker,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "../ui/shadcn-io/color-picker";
import { Spinner } from "../ui/spinner";
import ProfileFormFieldInfo from "./ProfileFormFieldInfo";

const ProfileForm = ({
  user,
  logout,
}: AuthProps & {
  logout: () => Promise<void>;
}) => {
  const fieldClassName = "flex flex-col md:flex-row md:gap-5";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name ?? "",
      surname: user?.surname ?? "",
      email: user?.email ?? "",
      profile_color: user?.profile_color ?? "#6e4596",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;

    try {
      let updated = false;

      if (data.password || data.email) {
        let userData: SupabaseAuthUser = {};
        if (data.email) userData = { email: data.email };
        if (data.password) userData = { password: data.password, ...userData };

        updated = await updateSupabaseAuthUser(userData);
      }

      const updates = {
        first_name: data.first_name,
        surname: data.surname,
        email: data.email,
        profile_color: data.profile_color,
        updated_at: new Date().toISOString(),
      };

      await updateSingleProfile(user?.id, updates);

      toast.success("Profile updated");
      reset(data);

      if (updated) {
        logout();
      }
    } catch (err: any) {
      toast.error(err.message ?? "Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet className="gap-3">
          <FieldSeparator />
          <FieldGroup className="gap-3">
            <Field className={fieldClassName}>
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="first_name">Nom complet</FieldLabel>
              </ProfileFormFieldInfo>

              <div className="flex flex-col w-full gap-2 md:flex-row md:gap-5">
                <div>
                  <Input
                    id="first_name"
                    type="text"
                    defaultValue={user?.first_name}
                    className="border-gray-400"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <FieldError>{errors.first_name.message}</FieldError>
                  )}
                </div>

                <div>
                  <Input
                    id="surname"
                    type="text"
                    defaultValue={user?.surname ?? undefined}
                    placeholder="Nom de famille"
                    className="border-gray-400"
                    {...register("surname")}
                  />
                  {errors.surname && (
                    <FieldError>{errors.surname.message}</FieldError>
                  )}
                </div>
              </div>
            </Field>
          </FieldGroup>

          <FieldSeparator />

          <FieldGroup className="gap-3">
            <Field className={fieldClassName}>
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="email">Email</FieldLabel>
              </ProfileFormFieldInfo>

              <div>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  className="border-gray-400"
                  {...register("email")}
                />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </div>
            </Field>

            <FieldSeparator />
            <Field className={fieldClassName}>
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="profile_tint">Profile tint</FieldLabel>
              </ProfileFormFieldInfo>

              <ColorPicker
                id="profile_tint"
                className="rounded-md border bg-background p-4 shadow-sm"
                defaultValue={user?.profile_color ?? "#6e4596"}
                //   {...register("profile_color")}
                //   onChange={(value) => { }}
              >
                <ColorPickerSelection />
                <div className="flex items-center">
                  <ColorPickerHue />
                </div>
                <div className="flex items-center gap-2">
                  <ColorPickerOutput />
                  <ColorPickerFormat />
                </div>
              </ColorPicker>
            </Field>
          </FieldGroup>

          <FieldSeparator />

          <FieldGroup className="gap-3">
            <Field className={fieldClassName}>
              <ProfileFormFieldInfo
                className="flex flex-col gap-2"
                style={{ alignItems: "start" }}
              >
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldDescription className="text-xs max-md:min-w-fit">
                  Password must be at least <span className="font-bold">8</span>{" "}
                  characters!
                </FieldDescription>
              </ProfileFormFieldInfo>

              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="border-gray-400"
                  {...register("password")}
                />
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </div>
            </Field>

            <Field className={fieldClassName}>
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="confirm_password">
                  Confirm password
                </FieldLabel>
              </ProfileFormFieldInfo>

              <div>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="********"
                  className="border-gray-400"
                  {...register("confirm_password")}
                />
                {errors.confirm_password && (
                  <FieldError>{errors.confirm_password.message}</FieldError>
                )}
              </div>
            </Field>
          </FieldGroup>

          <FieldSeparator />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Save changes"}
          </Button>

          <Button variant="outline" type="button" disabled={isSubmitting}>
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ProfileForm;
