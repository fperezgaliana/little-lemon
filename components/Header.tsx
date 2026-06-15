import { useRoute } from "@react-navigation/native";
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
  const route = useRoute();

  const showBack = route.name !== "Home";

  return (
    <View style={styles.header}>
      <View>
        {showBack && (
          <IconButton
            iconName="arrow-back"
            onPress={() => navigation.goBack()}
            size="small"
            rounded
          />
        )}
      </View>
      <Image source={require("../assets/images/Logo.png")} resizeMode="cover" />
      <UserAvatar
        userFirstName={userInfo.firstName}
        userSurname={userInfo.surname}
        userImage={userInfo.userImage}
        rounded
        size="small"
        onClick={onAvatarClick}
      />
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
