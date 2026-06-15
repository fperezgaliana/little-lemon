import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable } from "react-native";
import { colors, sharedStyles } from "../common/sharedStyles";

type Variant = "primary" | "secondary" | "outline";
type Size = "small" | "medium" | "large";

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

type IconButtonProps = {
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
  rounded?: boolean;
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
};

export const IconButton = ({
  iconName,
  onPress,
  disabled = false,
  variant = "primary",
  size = "medium",
  rounded = false,
}: IconButtonProps) => {
  const iconSizes = {
    small: 16,
    medium: 24,
    large: 32,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        sharedStyles.button,
        variants[variant].container,
        rounded && { borderRadius: 50 },
        disabled && sharedStyles.buttonDisabled,
        pressed && !disabled && sharedStyles.buttonPressed,
      ]}
    >
      <Ionicons
        name={iconName}
        size={iconSizes[size]}
        color={variants[variant].text.color}
      />
    </Pressable>
  );
};
