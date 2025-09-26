import colors from "@/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CChip from "./ui/CChip";
import CText from "./ui/CText";

type KeywordAccordionProps = {
  keywords: Set<string>;
  selectedKeywords: string[];
  toggleKeyword: (keyword: string) => void;
  limit?: number;
};

const KeywordAccordion = ({
  keywords,
  selectedKeywords,
  toggleKeyword,
  limit = 6,
}: KeywordAccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  const orderedKeywords = useMemo(() => {
    const arr = [
      ...selectedKeywords,
      ...Array.from(keywords)
        .filter((k) => !selectedKeywords.includes(k))
        .sort(),
    ];
    return arr;
  }, [keywords, selectedKeywords]);

  const visibleKeywords = expanded
    ? orderedKeywords
    : orderedKeywords.slice(0, limit);

  return (
    <View>
      <View className="flex-row flex-wrap justify-start gap-2 my-2">
        {visibleKeywords.map((keyword) => (
          <CChip
            key={keyword.toLowerCase()}
            content={keyword}
            isSelected={selectedKeywords.includes(keyword)}
            onToggle={toggleKeyword}
          />
        ))}
      </View>

      {orderedKeywords.length > limit && (
        <View className="w-full justify-end items-end">
          <TouchableOpacity
            onPress={() => setExpanded((prev) => !prev)}
            accessibilityRole="button"
            className="flex-row justify-end gap-2 items-center"
          >
            <CText
              className="text-sm underline"
              style={{ color: expanded ? colors.primary.DEFAULT : "#000" }}
            >
              {expanded ? "Voir moins" : "Voir plus"}
            </CText>
            <Ionicons
              name={expanded ? "caret-up-outline" : "caret-down-outline"}
              color={expanded ? colors.primary.DEFAULT : "#000"}
              size={12}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default KeywordAccordion;
