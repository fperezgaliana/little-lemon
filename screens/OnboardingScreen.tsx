import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sharedStyles } from "../common/sharedStyles";
import { Button } from "../components/Button";
import { Separator } from "../components/Separator";
import { useUserInfo } from "../hooks/useUserInfo";
import { useTypedNavigation } from "./navigation";

export const OnboardingScreen = () => {
  const navigation = useTypedNavigation();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const userInfo = useUserInfo();

  const handleNextPress = async () => {
    if (userInfo.patchUserInfo) {
      userInfo.patchUserInfo({ firstName, email });
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={styles.logoBar}>
        <Image
          source={require("../assets/images/Logo.png")}
          resizeMode="cover"
        />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" style={styles.content}>
          <Text style={sharedStyles.subtitle}>Let us get to know you!</Text>
          <Separator height={80} />
          <TextInput
            style={sharedStyles.input}
            placeholder="Your name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={sharedStyles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={(value) => setEmail(value.toLowerCase())}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View style={styles.bottomBar}>
        <Button
          title="Next"
          onPress={handleNextPress}
          disabled={!firstName || !email}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoBar: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBar: {
    flex: 0,
    width: "85%",
    alignItems: "flex-end",
  },
});
