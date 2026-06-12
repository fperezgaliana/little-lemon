import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sharedStyles } from "../common/sharedStyles";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Separator } from "../components/Separator";
import { UserAvatar } from "../components/UserAvatar";
import { useUserInfo } from "../hooks/useUserInfo";
import { useTypedNavigation } from "./navigation";

const emailNotifications = [
  { id: "order_statuses", label: "Order statuses" },
  { id: "password_changes", label: "Password changes" },
  { id: "special_offers", label: "Special offers" },
  { id: "newsletters", label: "Newsletters" },
];

export const ProfileScreen = () => {
  const userInfo = useUserInfo();
  const navigation = useTypedNavigation();

  const handleLogout = () => {
    if (userInfo.logout) {
      userInfo.logout();
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "Onboarding" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={sharedStyles.sectionTitle}>Personal information</Text>
        <Text style={sharedStyles.label}>Avatar</Text>
        <View style={styles.horizontalSection}>
          <UserAvatar size="large" />
          <Button title="Change" onPress={() => console.log("Change avatar")} />
          <Button
            title="Remove"
            onPress={() => console.log("Remove avatar")}
            variant="outline"
          />
        </View>
        <KeyboardAvoidingView style={styles.formSection} behavior="padding">
          <Input
            label="First Name"
            value={userInfo.firstName}
            onChangeText={() => {}}
          />
          <Input
            label="Surname"
            value={userInfo.surname}
            onChangeText={() => {}}
          />
          <Input
            label="Email"
            value={userInfo.email}
            onChangeText={() => {}}
            placeholder="Enter your email"
          />
          <Input
            label="Phone number"
            value={userInfo.phone}
            onChangeText={() => {}}
            placeholder="Enter your phone number"
          />
        </KeyboardAvoidingView>
        <Separator height={20} />
        <Text style={sharedStyles.sectionTitle}>E-mail notifications</Text>
        <View style={styles.formSection}>
          {emailNotifications.map((notification) => (
            <Checkbox
              key={notification.id}
              label={notification.label}
              value={false}
              onValueChange={() => {}}
            />
          ))}
        </View>
        <Separator height={20} />
        <Button title="Logout" onPress={handleLogout} variant="secondary" />
        <Separator height={20} />
      </ScrollView>
      <View style={styles.bottomBar}>
        <Button
          title="Discard changes"
          onPress={() => console.log("Discard changes")}
          variant="outline"
        />
        <Button
          title="Save changes"
          onPress={() => console.log("Save changes")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flex: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
  },
  bottomBar: {
    flex: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
  },
  horizontalSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  formSection: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 12,
  },
});
