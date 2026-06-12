import { Image, View } from "react-native";
import { sharedStyles } from "../common/sharedStyles";

export const SplashScreen = () => {
  return (
    <View style={sharedStyles.container}>
      <Image source={require("../assets/images/Logo.png")} resizeMode="cover" />
    </View>
  );
};
