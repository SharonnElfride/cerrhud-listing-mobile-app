import colors from "@/colors";
import { Chip } from "react-native-paper";

type CChipProps = {
  content: string;
  isSelected: boolean;
  onToggle: (content: string) => void;
};

const CChip = ({ content, isSelected, onToggle }: CChipProps) => {
  return (
    <Chip
      key={content}
      selected={isSelected}
      onPress={() => onToggle(content)}
      style={{
        backgroundColor: isSelected ? "rgba(249, 76, 175, 0.15)" : "#f5f5f5",
        borderWidth: 2,
        borderColor: isSelected ? colors.accent : "#fff",
      }}
      textStyle={{
        color: "#000",
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
      }}
    >
      {content}
    </Chip>
  );
};

export default CChip;
