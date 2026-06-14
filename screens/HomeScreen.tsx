import { colors, sharedStyles } from "@/common/sharedStyles";
import debounce from "lodash/debounce";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MenuSection } from "@/components/MenuSection";
import { useProducts } from "@/hooks/api/useProducts";
import { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTypedNavigation } from "./navigation";

export const HomeScreen = () => {
  const [textFilter, setTextFilter] = useState("");
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>();
  const navigation = useTypedNavigation();
  const {
    productsData: { data: products, isLoading, error },
    productCategoriesData: {
      data: categories,
      isLoading: isCategoriesLoading,
      error: categoriesError,
    },
  } = useProducts({
    textFilter,
    categoriesFilter,
  });

  const categoryNames = useMemo(
    () => categories?.map((c) => c.name) || [],
    [categories],
  );

  const debouncedSearch = debounce((text: string) => {
    setTextFilter(text);
  }, 500);

  return (
    <SafeAreaView style={sharedStyles.container}>
      <Header onAvatarClick={() => navigation.navigate("Profile")} />
      <HeroSection onChangeFilter={debouncedSearch} />
      <View style={styles.content}>
        {isLoading || isCategoriesLoading ? (
          <ActivityIndicator size="large" color={colors.primary1} />
        ) : error || categoriesError ? (
          <Text>Error loading products</Text>
        ) : null}
        <MenuSection
          items={products || []}
          categories={categoryNames}
          onCategorySelect={setCategoriesFilter}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
    padding: 20,
  },
});
