import { colors, fonts } from "@/common/sharedStyles";
import { Product } from "@/types";
import { Image, StyleSheet, Text, View } from "react-native";

type MenuItemProps = {
  isDisabled?: boolean;
  key?: string;
} & Product;

const shortenDescription = (description: string, maxChars: number = 100) =>
  description.length > maxChars
    ? `${description.substring(0, maxChars)}...`
    : description;

export const MenuItem = ({
  key,
  name,
  price,
  description,
  image,
}: MenuItemProps) => {
  return (
    <View key={key} style={styles.container}>
      <View style={styles.descriptionContent}>
        <Text style={styles.itemTitle}>{name}</Text>
        <Text style={styles.itemDescription}>
          {shortenDescription(description)}
        </Text>
        <Text style={styles.itemPrice}>{price} €</Text>
      </View>
      <Image source={{ uri: image }} style={styles.itemImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionContent: {
    flex: 1,
    paddingRight: 10,
  },
  itemTitle: {
    fontFamily: fonts.title,
    fontSize: 18,
  },
  itemDescription: {
    fontFamily: fonts.text,
    fontSize: 14,
    color: colors.primary1,
  },
  itemPrice: {
    fontFamily: fonts.title,
    fontSize: 16,
    color: colors.primary1,
    marginTop: 5,
    fontWeight: "bold",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
