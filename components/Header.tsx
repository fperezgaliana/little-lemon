import { Image, StyleSheet, View } from "react-native";
import { useUserInfo } from "../hooks/useUserInfo";
import { useTypedNavigation } from "../screens/navigation";
import { IconButton } from "./IconButton";
import { UserAvatar } from "./UserAvatar";

type HeaderProps = {
  onAvatarClick?: () => void;
};

export const Header = ({ onAvatarClick }: HeaderProps) => {
  const userInfo = useUserInfo();
  const navigation = useTypedNavigation();

  return (
    <View style={styles.header}>
      <View>
        {navigation.canGoBack() && (
          <IconButton
            iconName="arrow-back"
            onPress={() => navigation.goBack()}
            size="small"
            rounded
          />
        )}
      </View>
      <Image source={require("../assets/images/Logo.png")} resizeMode="cover" />
      <UserAvatar rounded size="small" onClick={onAvatarClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  userPhoto: {},
});
