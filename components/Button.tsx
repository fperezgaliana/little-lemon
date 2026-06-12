import { Pressable, Text } from "react-native";
import { colors, sharedStyles } from "../common/sharedStyles";

type Variant = "primary" | "secondary" | "outline";

const variants = {
  primary: {
    container: {
      backgroundColor: colors.primary1,
    },
    text: {
      color: colors.secondary3,
    },
  },

  secondary: {
    container: {
      backgroundColor: colors.primary2,
    },
    text: {
      color: colors.secondary4,
    },
  },

  outline: {
    container: {
      borderWidth: 1,
      borderColor: colors.primary1,
      backgroundColor: "transparent",
    },
    text: {
      color: colors.primary1,
    },
  },
};

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: Variant;
};

export const Button = ({
  title,
  onPress,
  disabled = false,
  variant = "primary",
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        sharedStyles.button,
        variants[variant].container,
        disabled && sharedStyles.buttonDisabled,
        pressed && !disabled && sharedStyles.buttonPressed,
      ]}
    >
      <Text style={[variants[variant].text]}>{title}</Text>
    </Pressable>
  );
};
