import colors from "@/colors";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { KeyboardTypeOptions, TextInput, View } from "react-native";
import CFormInputError from "./CFormInputError";
import CFormInputLabel from "./CFormInputLabel";

type CTextInputProps<T extends FieldValues> = {
  control: Control<T>;
  controlLabel: string;
  controlName: Path<T>;
  controlPlaceholder: string;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  isTextArea?: boolean;
};

function CTextInput<T extends FieldValues>({
  control,
  controlLabel,
  controlName,
  controlPlaceholder,
  required = false,
  keyboardType,
  isTextArea = false,
}: CTextInputProps<T>) {
  return (
    <View className="gap-2">
      <CFormInputLabel label={controlLabel} required={required} />
      <Controller
        control={control}
        name={controlName}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}
              className="text-black border border-primary rounded-lg p-2"
              placeholder={controlPlaceholder}
              placeholderTextColor={colors["placeholder-color"].DEFAULT}
              keyboardType={keyboardType}
              multiline={isTextArea}
              numberOfLines={isTextArea ? 5 : undefined}
              textAlignVertical={isTextArea ? "top" : "center"}
              style={[
                isTextArea
                  ? { height: 120, paddingVertical: 1, textAlign: "justify" }
                  : {},
                { fontFamily: "Poppins_400Regular" },
              ]}
            />
            {error && <CFormInputError errorMessage={error.message} />}
          </>
        )}
      />
    </View>
  );
}

export default CTextInput;
