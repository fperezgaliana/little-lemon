import { sharedStyles } from "@/common/sharedStyles";
import { Product } from "@/types";
import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";
import { MenuItem } from "./MenuItem";

type MenuSectionProps = {
  items: Product[];
  categories: string[];
  onCategorySelect?: (selectedCategories: string[]) => void;
};

export const MenuSection = ({
  items,
  categories,
  onCategorySelect,
}: MenuSectionProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  if (!items) {
    return null;
  }

  return (
    <>
      <View>
        <Text style={sharedStyles.sectionTitle}>ORDER FOR DELIVERY!</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.buttonsSection}
        >
          {categories.map((category) => (
            <Button
              key={category}
              style={styles.button}
              title={category}
              onPress={() => {
                if (selectedCategories.includes(category)) {
                  const newSelectedCategories = selectedCategories.filter(
                    (c) => c !== category,
                  );

                  setSelectedCategories(newSelectedCategories);
                  onCategorySelect?.(newSelectedCategories);
                } else {
                  const newSelectedCategories = [
                    ...selectedCategories,
                    category,
                  ];

                  setSelectedCategories(newSelectedCategories);
                  onCategorySelect?.(newSelectedCategories);
                }
              }}
              variant="primary"
              lighten={!selectedCategories.includes(category)}
            />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItem {...item} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonsSection: {
    marginBottom: 10,
  },
  button: {
    marginRight: 10,
  },
});
