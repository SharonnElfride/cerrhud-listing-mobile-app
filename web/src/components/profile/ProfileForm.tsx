import type { AuthProps } from "@/shared/AuthProps";
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

const ProfileForm = ({ user, loading }: AuthProps) => {
  const nm = user?.avatar;

  const fieldClassName = "flex flex-row gap-5";

  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldSeparator className="" />
          <FieldGroup>
            <Field className={fieldClassName}>
              <FieldLabel htmlFor="first_name" style={styles.fieldLabel}>
                Nom complet
              </FieldLabel>
              <div className="flex w-full gap-5">
                <Input id="first_name" type="text" placeholder="Evil" />

                <Input id="surname" type="text" placeholder="Rabbit" />
              </div>
            </Field>
          </FieldGroup>

          <FieldSeparator />

          <FieldGroup>
            <Field className={fieldClassName}>
              <FieldLabel htmlFor="email" style={styles.fieldLabel}>
                Email
              </FieldLabel>
              <Input id="email" type="email" placeholder="jane@doe.com" />
            </Field>

            <FieldSeparator />
            <Field className={fieldClassName}>
              <FieldLabel htmlFor="profile_tint" style={styles.fieldLabel}>
                Profile tint
              </FieldLabel>
              <Input id="profile_tint" placeholder="Evil Rabbit" />
            </Field>

            <FieldSeparator />
            <Field className={fieldClassName}>
              <FieldLabel htmlFor="update_pwd" style={styles.fieldLabel}>
                Change pwd
              </FieldLabel>
              <div className="flex flex-col gap-2">
                <FieldDescription className="text-xs">
                  Password must be at least <span className="font-bold">8</span>{" "}
                  characters!
                </FieldDescription>
                <Input id="update_pwd" type="password" placeholder="********" />
              </div>
            </Field>
          </FieldGroup>

          <FieldSeparator />
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

const styles = {
  fieldLabel: {
    width: "calc(1/5 * 100%)",
    minWidth: "fit-content",
  },
};

export default ProfileForm;
