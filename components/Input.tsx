import { StyleSheet, Text, TextInput, View } from "react-native";
import { sharedStyles } from "../common/sharedStyles";

type InputProps = {
  label: string;
  placeholder?: string;
  value: string | undefined;
  onChangeText: (text: string) => void;
};

export const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={sharedStyles.label}>{label}</Text>
      <TextInput
        style={{
          ...sharedStyles.input,
          width: "100%",
          margin: 0,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
  },
});
