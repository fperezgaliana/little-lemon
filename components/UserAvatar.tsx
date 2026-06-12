import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../common/sharedStyles";
import { useUserInfo } from "../hooks/useUserInfo";

type UserAvatarProps = {
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  rounded?: boolean;
};

export const UserAvatar = ({
  onClick,
  size = "medium",
  rounded = false,
}: UserAvatarProps) => {
  const userInfo = useUserInfo();

  if (userInfo.userImage) {
    return (
      <Pressable onPress={onClick}>
        <Image
          source={{ uri: userInfo.userImage }}
          style={{
            width: size === "small" ? 40 : size === "medium" ? 60 : 80,
            height: size === "small" ? 40 : size === "medium" ? 60 : 80,
            borderRadius: rounded ? "50%" : 0,
          }}
        />
      </Pressable>
    );
  } else {
    const initials = `${userInfo.firstName?.[0] || ""}${userInfo.surname?.[0] || ""}`;
    return (
      <Pressable onPress={onClick}>
        <View
          style={{
            ...styles.avatar,
            width: size === "small" ? 40 : size === "medium" ? 60 : 80,
            height: size === "small" ? 40 : size === "medium" ? 60 : 80,
            borderRadius: rounded ? "50%" : 0,
          }}
        >
          <Text
            style={{
              ...styles.initials,
              fontSize: size === "small" ? 16 : size === "medium" ? 24 : 32,
            }}
          >
            {initials}
          </Text>
        </View>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.secondary4,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: colors.secondary3,
  },
});
