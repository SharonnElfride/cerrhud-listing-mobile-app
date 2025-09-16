import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
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
  defaultValue?: PathValue<T, Path<T>>;
  required?: boolean;
};

export function CRadioGroup<T extends FieldValues>({
  control,
  controlName,
  controlLabel,
  options,
  defaultValue,
  required,
}: CRadioGroupProps<T>) {
  return (
    <Controller
      control={control}
      name={controlName}
      defaultValue={defaultValue}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View className="gap-2">
          <CFormInputLabel label={controlLabel} required={required} />

          <RadioButton.Group onValueChange={onChange} value={value}>
            {options.map((opt) => (
              <View key={opt.value} className="flex-row items-center gap-2">
                <RadioButton value={opt.value} />
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
