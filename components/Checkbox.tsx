import ExpoCheckbox from "expo-checkbox";
import { Text, View } from "react-native";

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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 6,
      }}
      key={props.key}
    >
      <ExpoCheckbox
        value={value}
        onValueChange={onValueChange}
        color={value ? "#4630EB" : undefined}
      />
      <Text style={{ marginRight: 8 }}>{label}</Text>
    </View>
  );
};
