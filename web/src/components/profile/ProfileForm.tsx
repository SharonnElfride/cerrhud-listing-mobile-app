import { type ProfileFormValues, profileSchema } from "@/forms/profileSchema";
import type { AuthProps } from "@/shared/AuthProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
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
import ProfileFormFieldInfo from "./ProfileFormFieldInfo";
import { toast } from "sonner";
import { useState } from "react";

const ProfileForm = ({ user, loading }: AuthProps) => {
  const fieldClassName = "flex flex-col md:flex-row md:gap-5";
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  async function handleProfileSubmit(values: ProfileFormValues) {
    try {
      // 1) If avatarFile exists, upload and get publicUrl
      if (avatarFile) {
        const publicUrl = await uploadAvatar(avatarFile, user.id);
        values.avatar = publicUrl;
      }

      // 2) Upsert profile fields
      await supabase.from("profiles").upsert({
        id: user.id,
        first_name: values.first_name,
        surname: values.surname,
        email: values.email,
        profile_color: values.profile_color,
        avatar: values.avatar,
        updated_at: new Date().toISOString(),
      });

      // 3) If password supplied, update auth
      if (values.password) {
        await supabase.auth.updateUser({ password: values.password });
      }

      // 4) Apply theme immediately client-side
      applyUserTheme(values.profile_color);

      toast.success("Saved");
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  const onSubmit = async (data: ProfileFormValues) => {
    setSaving(true);

    try {
      // 1) Update avatar previously uploaded (see next section) or other profile fields
      // 2) Update profiles table
      const updates = {
        // id: user.id,
        first_name: data.first_name,
        surname: data.surname,
        email: data.email,
        profile_color: data.profile_color,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) {
        setSaving(false);
        throw error;
      }

      // 3) If password provided, update auth
      if (data.password) {
        const { error: passErr } = await supabase.auth.updateUser({
          password: data.password,
        });
        if (passErr) {
          setSaving(false);
          throw passErr;
        }
      }

      toast.success("Profile updated");
      reset(data);
    } catch (err: any) {
      toast.error(err.message ?? "Update failed");
    }

    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldSeparator />
          <FieldGroup>
            {/* {...register("first_name")} */}
            <Field className={fieldClassName}>
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="first_name">Nom complet</FieldLabel>
              </ProfileFormFieldInfo>

              <div className="flex flex-col w-full gap-2 md:flex-row md:gap-5">
                <Input
                  id="first_name"
                  type="text"
                  defaultValue={user?.first_name}
                  className="border-gray-400"
                  {...register("first_name")}
                />

                <Input
                  id="surname"
                  type="text"
                  defaultValue={user?.surname ?? undefined}
                  placeholder="Nom de famille"
                  className="border-gray-400"
                  {...register("surname")}
                />
              </div>
            </Field>
          </FieldGroup>

          <FieldSeparator />

          <FieldGroup>
            <Field className={fieldClassName}>
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="email">Email</FieldLabel>
              </ProfileFormFieldInfo>

              <Input
                id="email"
                type="email"
                defaultValue={user?.email}
                className="border-gray-400"
                {...register("email")}
              />
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

            {/* <FieldSeparator />
            <Field className={fieldClassName}>
              <ProfileFormFieldInfo
                className="flex flex-col gap-2"
                style={{ alignItems: "start" }}
              >
                <FieldLabel htmlFor="password">Change pwd</FieldLabel>
                <FieldDescription className="text-xs max-md:min-w-fit">
                  Password must be at least <span className="font-bold">8</span>{" "}
                  characters!
                </FieldDescription>
              </ProfileFormFieldInfo>

              <Input
                id="password"
                type="password"
                placeholder="********"
                className="border-gray-400"
                  {...register("password")}
              />
            </Field> */}
          </FieldGroup>

          <FieldSeparator />

          <FieldGroup>
            <Field className={fieldClassName}>
              <ProfileFormFieldInfo
                className="flex flex-col gap-2"
                style={{ alignItems: "start" }}
              >
                <FieldLabel htmlFor="password">Change pwd</FieldLabel>
                <FieldDescription className="text-xs max-md:min-w-fit">
                  Password must be at least <span className="font-bold">8</span>{" "}
                  characters!
                </FieldDescription>
              </ProfileFormFieldInfo>

              <Input
                id="password"
                type="password"
                placeholder="********"
                className="border-gray-400"
                {...register("password")}
              />
            </Field>

            <Field className={fieldClassName}>
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="confirm_password">Change pwd</FieldLabel>
              </ProfileFormFieldInfo>

              <Input
                id="confirm_password"
                type="password"
                placeholder="********"
                className="border-gray-400"
                {...register("confirm_password")}
              />
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {/* <Field data-invalid>
            <FieldLabel htmlFor="mail">Mail</FieldLabel>
            <Input id="mail" type="email" className="border-white" aria-invalid/>
            <FieldError>Enter a valid email address.</FieldError>
          </Field>
          <FieldSeparator /> */}
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit">Save changes</Button>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ProfileForm;
