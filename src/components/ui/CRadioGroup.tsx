import colors from "@/colors";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";
import CFormInputError from "./CFormInputError";
import CFormInputLabel from "./CFormInputLabel";
import CText from "./CText";

type CRadioGroupProps<T extends FieldValues> = {
  control: Control<T>;
  controlName: Path<T>;
  controlLabel: string;
  options: { label: string; value: any }[];
  required?: boolean;
};

export function CRadioGroup<T extends FieldValues>({
  control,
  controlName,
  controlLabel,
  options,
  required,
}: CRadioGroupProps<T>) {
  return (
    <Controller
      control={control}
      name={controlName}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View className="gap-2">
          <CFormInputLabel label={controlLabel} required={required} />

          <RadioButton.Group onValueChange={onChange} value={value}>
            {options.map((opt) => (
              <View key={opt.value} className="flex-row items-center gap-2">
                <RadioButton.Android
                  value={opt.value}
                  color={colors.primary.DEFAULT}
                />
                <CText>{opt.label}</CText>
              </View>
            ))}
          </RadioButton.Group>
          {error && <CFormInputError errorMessage={error.message} />}
        </View>
      )}
    />
  );
}
