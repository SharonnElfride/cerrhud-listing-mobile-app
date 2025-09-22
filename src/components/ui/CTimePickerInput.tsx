import colors from "@/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import CFormInputLabel from "./CFormInputLabel";
import CText from "./CText";

type CTimePickerInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
};

function TimePickerPart({
  selectedValue,
  onValueChange,
  setValue,
  availableValues,
}: {
  selectedValue: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  onValueChange?: (value: number | null) => void;
  availableValues: number[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <View className="flex-1">
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={availableValues.map((m) => ({
          label: m.toString().padStart(2, "0"),
          value: m,
        }))}
        setOpen={setOpen}
        onChangeValue={onValueChange}
        setValue={setValue}
        listMode="SCROLLVIEW"
        style={{
          borderWidth: 1,
          borderColor: colors.primary.DEFAULT,
          borderRadius: 10,
        }}
        dropDownContainerStyle={{
          borderWidth: 1,
          borderColor: colors.primary.DEFAULT,
        }}
        ArrowDownIconComponent={() => (
          <Ionicons name="caret-down-outline" size={18} color={colors.caret} />
        )}
        ArrowUpIconComponent={() => (
          <Ionicons
            name="caret-up-outline"
            size={18}
            color={colors.primary.DEFAULT}
          />
        )}
      />
    </View>
  );
}

function CTimePickerInput<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
}: CTimePickerInputProps<T>) {
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(0);

  const availableHours = Array.from({ length: 9 }, (_, i) => i + 7); // 7 → 15
  const availableMinutes = [0, 15, 30, 45];
  // const availableMinutes =
  //   hour === 15
  //     ? [0, 15, 30, 45] // last slot ends at 15:45 (Might be 16:15)
  //     : Array.from({ length: 60 }, (_, i) => i);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <View style={{ marginVertical: 8 }}>
            <CFormInputLabel label={label} required={required} />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Hour Picker */}
              <TimePickerPart
                selectedValue={hour}
                setValue={setHour}
                onValueChange={(val) => {
                  if (val) {
                    setHour(val);
                    onChange(
                      `${val.toString().padStart(2, "0")}h${minute
                        .toString()
                        .padStart(2, "0")}`
                    );
                  }
                }}
                availableValues={availableHours}
              />

              <CText className="mx-1 font-bold text-lg">:</CText>

              {/* Minute Picker */}
              <TimePickerPart
                selectedValue={minute}
                setValue={setMinute}
                onValueChange={(val) => {
                  if (val) {
                    setMinute(val);
                    onChange(
                      `${hour.toString().padStart(2, "0")}h${val.toString().padStart(2, "0")}`
                    );
                  }
                }}
                availableValues={availableMinutes}
              />
            </View>
          </View>
        );
      }}
    />
  );
}

export default CTimePickerInput;
