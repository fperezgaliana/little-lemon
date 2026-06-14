import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { sharedStyles } from "../common/sharedStyles";

type InputProps = {
  label?: string;
} & TextInputProps;

export const Input = ({ label, style, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={sharedStyles.label}>{label}</Text>}
      <TextInput
        style={{
          ...sharedStyles.input,
          width: "100%",
          margin: 0,
          ...styles,
        }}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
