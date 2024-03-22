import React, { useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  ScrollView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const HomeHeader = ({ searchQuery, setSearchQuery, onFilterPress, handlePresentModal, handleSearch, handleClear }) => {
  const categories = [
    {
      name: "Condition",
      //icon: "pricetag-outline",
    },
    {
      name: "Category",
      //icon: "pricetag-outline",
    },
    {
      name: "Subject",
      //icon: "pricetag-outline",
    },
  ];

  const isSearchEmpty = searchQuery.trim() === "";

  const onSubmitEditing = () => {
    if (!isSearchEmpty) {
      handleSearch();
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons
            name="search-outline"
            size={24}
            //color="#3f9eeb"
            color="grey"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Seach here!"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={onSubmitEditing}
          />

          {!isSearchEmpty && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Ionicons
                name="close-outline"
                size={24}
                //color="#3f9eeb"
                color="grey"
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          )}  
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={handlePresentModal}>
          <Ionicons name="options-outline" size={25} color="grey"></Ionicons>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{
          alignItems: "center",
          gap: 20,
          paddingHorizontal: 15,
          //backgroundColor: "red",
        }}
      >
        {categories.map((item, index) => (
          <TouchableOpacity style={styles.tagButtons} key={index}
          >
            {/* <Ionicons size="20" name={item.icon} /> */}
            <Text style={styles.tagText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6f2ff",
    //backgroundColor: "red",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //backgroundColor: "pink",
    backgroundColor: "#e6f2ff",
    height: 80,
  },
  searchIcon: {
    marginRight: 0,
  },
  searchContainer: {
    //position: "relative",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderRadius: 25,
    marginLeft: 0,
    //backgroundColor: "transparent",
    //backgroundColor: "pink",
    backgroundColor: "#e6f2ff",
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "transparent",
    // borderColor: "#3f9eeb",
    // borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 55,
  },
  filterButton: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 30,
    //backgroundColor: "yellow",
  },
  searchButton: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 30,
    //backgroundColor: "yellow",
  },
  clearButton: {
    padding: 10,
    borderRadius: 30,
    //backgroundColor: "yellow",
  },
  tagButtons: {
    //backgroundColor: "#3f9eeb",
    //borderRadius: 10,
    //borderWidth: 1,
    padding: 3,
    margin: 3,
    alignItems: "center",
  },
  tagText: {
    fontSize: 10,
    color: "grey",
    padding: 10,
  },
});

export default HomeHeader;
