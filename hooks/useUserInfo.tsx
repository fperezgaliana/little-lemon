import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export interface UserInfo {
  loadingData: boolean;
  firstName: string | undefined;
  surname: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  emailNotifications: string | undefined;
  userImage?: string | undefined;
  patchUserInfo?: (updatedInfo: Partial<UserInfo>) => Promise<void>;
  logout?: () => void;
}

export const useUserInfo = create<UserInfo>((set) => ({
  loadingData: false,
  firstName: undefined,
  surname: undefined,
  phone: undefined,
  email: undefined,
  emailNotifications: undefined,
  userImage: undefined,
  patchUserInfo: async (updatedInfo) => {
    set((state) => ({ ...state, ...updatedInfo }));

    try {
      if (updatedInfo.firstName !== undefined) {
        await AsyncStorage.setItem("firstName", updatedInfo.firstName);
      }
      if (updatedInfo.surname !== undefined) {
        await AsyncStorage.setItem("surname", updatedInfo.surname);
      }
      if (updatedInfo.phone !== undefined) {
        await AsyncStorage.setItem("phone", updatedInfo.phone);
      }
      if (updatedInfo.email !== undefined) {
        await AsyncStorage.setItem("email", updatedInfo.email);
      }
      if (updatedInfo.userImage !== undefined) {
        await AsyncStorage.setItem("userImage", updatedInfo.userImage);
      }
      if (updatedInfo.emailNotifications !== undefined) {
        await AsyncStorage.setItem(
          "emailNotifications",
          updatedInfo.emailNotifications,
        );
      }
    } catch (error) {
      console.error("Error updating user info in AsyncStorage:", error);
    }
  },
  logout: async () => {
    try {
      await AsyncStorage.multiRemove([
        "firstName",
        "surname",
        "phone",
        "email",
        "userImage",
        "emailNotifications",
      ]);
      set({
        firstName: undefined,
        surname: undefined,
        phone: undefined,
        email: undefined,
        userImage: undefined,
        emailNotifications: undefined,
      });
    } catch (error) {
      console.error("Error clearing user info from AsyncStorage:", error);
    }
  },
}));

export const loadUserInfo = async () => {
  try {
    useUserInfo.setState({ loadingData: true });

    AsyncStorage.multiGet([
      "firstName",
      "surname",
      "phone",
      "email",
      "userImage",
      "emailNotifications",
    ]).then((result) => {
      const parsedObject = result.reduce(
        (acc, [key, value]) => {
          if (value !== null) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      useUserInfo.setState(parsedObject);
    });
  } catch (error) {
    console.error("Error loading user info from AsyncStorage:", error);
  } finally {
    useUserInfo.setState({ loadingData: false });
  }
};
