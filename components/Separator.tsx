import { colors } from "@/common/sharedStyles";
import { StyleSheet, View } from "react-native";

interface SeparatorProps {
  height: number;
  displayLine?: boolean;
}

export const Separator = ({ height, displayLine = false }: SeparatorProps) => {
  return (
    <View
      style={{
        ...styles.separatorContainer,
        height,
      }}
    >
      {displayLine && <View style={styles.separatorLine} />}
    </View>
  );
};

const styles = StyleSheet.create({
  separatorContainer: {
    flex: 0,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  separatorLine: {
    height: 1,
    width: "100%",
    backgroundColor: colors.primary1,
    filter: "brightness(0.5)",
  },
});
