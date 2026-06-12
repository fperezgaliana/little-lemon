import { View } from "react-native";

interface SeparatorProps {
  height: number;
  displayLine?: boolean;
}

export const Separator = ({ height, displayLine = true }: SeparatorProps) => {
  return (
    <View
      style={{
        flex: 0,
        height,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {displayLine && <View style={{ height: 1, backgroundColor: "#ccc" }} />}
    </View>
  );
};
