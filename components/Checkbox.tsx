import { colors } from "@/common/sharedStyles";
import ExpoCheckbox from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";

type CheckboxProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export const Checkbox = ({
  label,
  value,
  onValueChange,
  ...props
}: CheckboxProps & { key?: string }) => {
  return (
    <View style={styles.container} key={props.key}>
      <ExpoCheckbox
        value={value}
        onValueChange={onValueChange}
        color={colors.primary1}
      />
      <Text style={{ marginRight: 8 }}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
});
