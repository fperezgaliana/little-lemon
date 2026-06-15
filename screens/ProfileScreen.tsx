import { useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, sharedStyles } from "../common/sharedStyles";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Separator } from "../components/Separator";
import { UserAvatar } from "../components/UserAvatar";
import { db } from "../db";
import { useUserInfo } from "../hooks/useUserInfo";
import { useTypedNavigation } from "./navigation";

const emailNotificationsOptions = [
  { id: "order_statuses", label: "Order statuses" },
  { id: "password_changes", label: "Password changes" },
  { id: "special_offers", label: "Special offers" },
  { id: "newsletters", label: "Newsletters" },
];

export const ProfileScreen = () => {
  const {
    firstName,
    surname,
    email,
    emailNotifications,
    phone,
    userImage,
    logout,
    patchUserInfo,
  } = useUserInfo();
  const navigation = useTypedNavigation();

  const [userData, setUserData] = useState({
    firstName,
    surname,
    email,
    phone,
    userImage,
    emailNotifications, // will contain values separated by commas: f.i. order_statuses,password_changes and so on
  });
  const [touched, setTouched] = useState(false);

  const queryClient = useQueryClient();

  const patchUserData = (updatedData: Partial<typeof userData>) => {
    const mergedData = { ...userData, ...updatedData };
    setUserData(mergedData);
    setTouched(true);
  };

  const handleLogout = () => {
    if (logout) {
      logout();
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "Onboarding" }],
    });
  };

  const handleCancel = () => {
    setUserData({
      firstName,
      surname,
      email,
      phone,
      userImage,
      emailNotifications,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await patchUserInfo?.({
        firstName: userData.firstName,
        surname: userData.surname,
        email: userData.email,
        phone: userData.phone,
        userImage: userData.userImage,
        emailNotifications: userData.emailNotifications,
      });

      Alert.alert("Success", "Your data has been updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      Alert.alert("Error", "Failed to update user data");
    }
  };

  const handleImageChange = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      patchUserData({ userImage: result.assets[0].uri });
    }
  };

  const handleClearCache = async () => {
    await db.execAsync("DELETE FROM products");
    await db.execAsync("DROP TABLE IF EXISTS products");
    queryClient.invalidateQueries({ queryKey: ["products"] });

    Alert.alert("Cache cleared successfully");
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
          <UserAvatar
            userFirstName={userData.firstName}
            userSurname={userData.surname}
            userImage={userData.userImage}
            size="large"
          />
          <Button title="Change" onPress={handleImageChange} />
          <Button
            title="Remove"
            disabled={!userData.userImage}
            onPress={() => {
              patchUserData({ userImage: undefined });
            }}
            variant="outline"
          />
        </View>
        <KeyboardAvoidingView style={styles.formSection} behavior="padding">
          <Input
            label="First Name"
            value={userData.firstName}
            onChangeText={(value) =>
              patchUserData({
                firstName: value,
              })
            }
          />
          <Input
            label="Surname"
            value={userData.surname}
            onChangeText={(value) =>
              patchUserData({
                surname: value,
              })
            }
          />
          <Input
            label="Email"
            value={userData.email}
            onChangeText={(value) =>
              patchUserData({
                email: value,
              })
            }
            placeholder="Enter your email"
          />
          <Input
            label="Phone number"
            value={userData.phone}
            onChangeText={(value) =>
              patchUserData({
                phone: value,
              })
            }
            placeholder="Enter your phone number"
          />
        </KeyboardAvoidingView>
        <Separator height={20} />
        <Text style={sharedStyles.sectionTitle}>E-mail notifications</Text>
        <View style={styles.formSection}>
          {emailNotificationsOptions.map((notification) => (
            <Checkbox
              key={notification.id}
              label={notification.label}
              value={!!userData.emailNotifications?.includes(notification.id)}
              onValueChange={(value) => {
                const selectedNotifications =
                  userData.emailNotifications?.split(",") || [];
                if (value) {
                  selectedNotifications.push(notification.id);
                } else {
                  const index = selectedNotifications.indexOf(notification.id);
                  if (index > -1) {
                    selectedNotifications.splice(index, 1);
                  }
                }
                patchUserData({
                  emailNotifications: selectedNotifications.join(","),
                });
              }}
            />
          ))}
        </View>
        <Separator height={20} />
        {__DEV__ && (
          <Button
            title="Clear cache"
            onPress={handleClearCache}
            variant="outline"
          />
        )}
        <Separator height={10} />
        <Button title="Logout" onPress={handleLogout} variant="secondary" />
        <Separator height={20} />
      </ScrollView>
      <View style={styles.bottomBar}>
        <Button
          title="Discard changes"
          disabled={!touched}
          onPress={handleCancel}
          variant="outline"
        />
        <Button
          title="Save changes"
          disabled={!touched}
          onPress={handleSaveChanges}
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
    backgroundColor: colors.secondary3,
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
