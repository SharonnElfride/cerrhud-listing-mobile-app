import colors from "@/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo, useState } from "react";
import { LayoutChangeEvent, TouchableOpacity, View } from "react-native";
import CChip from "./ui/CChip";
import CText from "./ui/CText";

type KeywordAccordionProps = {
  keywords: Set<string>;
  selectedKeywords: string[];
  setSelectedKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  multipleSelection?: boolean;
};

const KeywordAccordion = ({
  keywords,
  selectedKeywords,
  setSelectedKeywords,
  multipleSelection = false,
}: KeywordAccordionProps) => {
  const [expanded, setExpanded] = useState(false);
  const [rowLimit, setRowLimit] = useState<number | null>(null);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((kw) => kw !== keyword)
        : multipleSelection
          ? [...prev, keyword]
          : [keyword]
    );
  };

  const orderedKeywords = useMemo(() => {
    return [
      ...selectedKeywords,
      ...Array.from(keywords)
        .filter((k) => !selectedKeywords.includes(k))
        .sort(),
    ];
  }, [keywords, selectedKeywords]);

  const handleLayout = (event: LayoutChangeEvent) => {
    if (rowLimit !== null) return;

    const { width } = event.nativeEvent.layout;
    let total = 0;
    let rowCount = 0;

    for (const keyword of orderedKeywords) {
      const approxWidth = keyword.length * 10 + 32;
      if (total + approxWidth > width) break;
      total += approxWidth + 8;
      rowCount++;
    }

    setRowLimit(rowCount);
  };

  const limit = rowLimit ?? orderedKeywords.length;
  const visibleKeywords = expanded
    ? orderedKeywords
    : orderedKeywords.slice(0, limit);

  return (
    <View>
      <View
        className="flex-row flex-wrap justify-between gap-2 my-2"
        onLayout={handleLayout}
      >
        {visibleKeywords.map((keyword) => (
          <CChip
            key={keyword.toLowerCase()}
            content={keyword}
            isSelected={selectedKeywords.includes(keyword)}
            onToggle={toggleKeyword}
          />
        ))}
      </View>

      {rowLimit !== null && orderedKeywords.length > rowLimit && (
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
