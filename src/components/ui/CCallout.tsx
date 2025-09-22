import { View } from "react-native";
import CText from "./CText";
import CTitleText from "./CTitleText";

type CCalloutProps = {
  type?: "info" | "warning" | "tip" | "danger" | "primary" | "accent";
  title?: string;
  children: React.ReactNode;
};

const colors = {
  info: { border: "#007bff", bg: "#e7f3ff" },
  warning: { border: "#ff9800", bg: "#fff3e0" },
  danger: { border: "#f44336", bg: "#ffebee" },
  tip: { border: "#4caf50", bg: "#e8f5e9" },
  primary: { border: "#6e4596", bg: "rgba(110, 69, 150, 0.1)" },
  accent: { border: "#f94caf", bg: "rgba(249, 76, 175, 0.1)" },
};

const CCallout = ({ type = "primary", title, children }: CCalloutProps) => {
  const { border, bg } = colors[type];
  return (
    <View
      style={{
        borderLeftWidth: 4,
        borderLeftColor: border,
        backgroundColor: bg,
        borderRadius: 6,
        padding: 10,
        marginVertical: 5,
      }}
    >
      {title && (
        <CTitleText style={{ fontWeight: "bold", marginBottom: 4 }}>
          {title}
        </CTitleText>
      )}
      <CText className="text-justify">{children}</CText>
    </View>
  );
};

export default CCallout;
