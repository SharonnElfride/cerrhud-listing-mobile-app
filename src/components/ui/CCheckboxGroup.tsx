import colors from "@/colors";
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
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const currentValue = (value ?? []) as string[];

        return (
          <View className="gap-2 justify-center">
            <CFormInputLabel label={controlLabel} required={required} />

            {options.map((opt) => {
              const checked = currentValue.includes(opt.value);

              return (
                <Pressable
                  key={opt.value}
                  onPress={() =>
                    checked
                      ? onChange(currentValue.filter((v) => v !== opt.value))
                      : onChange([...currentValue, opt.value])
                  }
                  className="flex-row items-center gap-2"
                >
                  <Checkbox.Android
                    status={checked ? "checked" : "unchecked"}
                    color={colors.primary.DEFAULT}
                  />
                  <CText>{opt.label}</CText>
                </Pressable>
              );
            })}

            {error && <CFormInputError errorMessage={error.message} />}
          </View>
        );
      }}
    />
  );
}
