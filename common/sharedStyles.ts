import { StyleSheet } from "react-native";

export const colors = {
  primary1: "#495E57",
  primary2: "#F4CE14",
  secondary1: "#EE9972",
  secondary2: "#FBDABB",
  secondary3: "#EDEFEE",
  secondary4: "#333333",
};

export const fonts = {
  leadingTitle: "MarkaziText_500Medium",
  title: "Karla_700Bold",
  text: "Karla_400Regular",
};

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary3,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.leadingTitle,
    fontSize: 32,
    fontWeight: "500",
    color: colors.secondary4,
  },
  subtitle: {
    fontFamily: fonts.title,
    fontSize: 24,
    fontWeight: "700",
    color: colors.secondary4,
    textAlign: "center",
    marginTop: 10,
  },
  input: {
    width: "85%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontFamily: fonts.text,
  },
  button: {
    padding: 10,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.secondary4,
  },
  buttonDisabled: {
    opacity: 0.5,
    filter: "saturate(0.7)",
  },
  buttonPressed: {
    filter: "brightness(0.9)",
  },
  sectionTitle: {
    fontFamily: fonts.title,
    fontSize: 18,
    fontWeight: "700",
    color: colors.secondary4,
    marginBottom: 8,
  },
  label: {
    fontFamily: fonts.text,
    fontSize: 14,
    color: colors.secondary4,
    marginBottom: 4,
  },
});
