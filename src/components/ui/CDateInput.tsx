import colors from "@/colors";
import { PickerDateFormat } from "@/src/constants/shared";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Pressable, View } from "react-native";
import CFormInputError from "./CFormInputError";
import CFormInputLabel from "./CFormInputLabel";
import CText from "./CText";

type CDateInputProps<T extends FieldValues> = {
  control: Control<T>;
  controlName: Path<T>;
  controlLabel: string;
  required?: boolean;
};

export function CDateInput<T extends FieldValues>({
  control,
  controlName,
  controlLabel,
  required,
}: CDateInputProps<T>) {
  const [show, setShow] = useState(false);
  const now = new Date();
  const maxDate = new Date(now);
  maxDate.setFullYear(now.getFullYear() + 1);

  return (
    <Controller
      control={control}
      name={controlName}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View className="gap-2">
          <CFormInputLabel label={controlLabel} required={required} />

          <Pressable
            onPress={() => setShow(true)}
            className="border border-primary rounded-xl px-3 py-2"
          >
            <CText>
              {value
                ? format(new Date(value), PickerDateFormat, { locale: fr })
                : "Sélectionner une date"}
            </CText>
          </Pressable>

          {show && (
            <DateTimePicker
              mode="date"
              minimumDate={now}
              maximumDate={maxDate}
              textColor={colors.primary.DEFAULT}
              accentColor={colors.primary.DEFAULT}
              locale="fr-FR"
              value={value ? new Date(value) : new Date()}
              onChange={(event, date) => {
                setShow(false);
                if (event.type === "dismissed") {
                  return;
                }

                if (date) {
                  onChange(date);
                }
              }}
            />
          )}

          {error && <CFormInputError errorMessage={error.message} />}
        </View>
      )}
    />
  );
}

/*
Change main colour in: android/app/src/main/res/values/styles.xml

<resources>
  <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="android:datePickerStyle">@style/CustomDatePicker</item>
  </style>

  <style name="CustomDatePicker" parent="@android:style/Widget.DeviceDefault.DatePicker">
    <item name="android:accentColor">#FF6347</item> <!-- tomato -->
  </style>
</resources>

*/
