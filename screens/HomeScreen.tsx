import { SafeAreaView } from "react-native-safe-area-context";
import { sharedStyles } from "../common/sharedStyles";

import { View } from "react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useTypedNavigation } from "./navigation";

export const HomeScreen = () => {
  const navigation = useTypedNavigation();

  return (
    <SafeAreaView style={sharedStyles.container}>
      <Header onAvatarClick={() => navigation.navigate("Profile")} />
      <View>
        <Button
          title="Go to Profile"
          onPress={() => console.log("Go to profile")}
        />
      </View>
    </SafeAreaView>
  );
};
