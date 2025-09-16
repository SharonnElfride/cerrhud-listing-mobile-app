import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Pressable, View } from "react-native";
import { Checkbox } from "react-native-paper";
import CFormInputError from "./CFormInputError";
import CFormInputLabel from "./CFormInputLabel";
import CText from "./CText";

type CCheckboxGroupProps<T extends FieldValues> = {
  control: Control<T>;
  controlName: Path<T>;
  controlLabel: string;
  options: { label: string; value: string }[];
  required?: boolean;
};

export function CCheckboxGroup<T extends FieldValues>({
  control,
  controlName,
  controlLabel,
  options,
  required,
}: CCheckboxGroupProps<T>) {
  return (
    <Controller
      control={control}
      name={controlName}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => (
        <View className="gap-2">
          <CFormInputLabel label={controlLabel} required={required} />

          {options.map((opt) => {
            const checked = (value as string[]).includes(opt.value);
            return (
              <Pressable
                key={opt.value}
                onPress={() =>
                  checked
                    ? onChange(value.filter((v: string) => v !== opt.value))
                    : onChange([...value, opt.value])
                }
                className="flex-row items-center gap-2"
              >
                <Checkbox status={checked ? "checked" : "unchecked"} />
                <CText>{opt.label}</CText>
              </Pressable>
            );
          })}

          {error && <CFormInputError errorMessage={error.message} />}
        </View>
      )}
    />
  );
}
