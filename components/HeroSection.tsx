import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, fonts, sharedStyles } from "../common/sharedStyles";

type HeroSectionProps = {
  onChangeFilter?: (text: string) => void;
};

export const HeroSection = ({ onChangeFilter }: HeroSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    onChangeFilter?.(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.subtitle}>Chicago</Text>
      <View style={styles.content}>
        <Text style={styles.text}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
        <Image
          source={require("../assets/images/Hero image.png")}
          style={styles.image}
        />
      </View>
      <TextInput
        value={searchTerm}
        onChangeText={handleSearch}
        placeholder="Search any dish"
        autoComplete="off"
        autoCorrect={false}
        spellCheck={false}
        style={{
          ...sharedStyles.input,
          ...styles.searchInput,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 18,
    backgroundColor: colors.primary1,
    marginBottom: 20,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: {
    fontFamily: fonts.leadingTitle,
    fontSize: 32,
    color: colors.primary2,
  },
  subtitle: {
    fontFamily: fonts.leadingTitle,
    fontSize: 24,
    color: colors.secondary3,
    marginBottom: 10,
  },
  text: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fonts.text,
    fontSize: 16,
    color: colors.secondary3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchInput: {
    width: "100%",
    marginTop: 20,
    marginBottom: 0,
    alignSelf: "center",
    backgroundColor: colors.secondary3,
  },
});
