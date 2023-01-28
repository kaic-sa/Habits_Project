import { Text, View, TouchableOpacity } from "react-native";
import Logo from "../assets/logo.svg";
import { Entypo } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

export function Header() {
  const { navigate } = useNavigation();
  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo></Logo>

      <TouchableOpacity
        className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
        activeOpacity={0.7}
        onPress={() => navigate("new")}
      >
        <Entypo name="plus" color={colors.violet[500]} size={20}></Entypo>
        <Text className="text-white ml-3 font-semibold text-base"> Novo </Text>
      </TouchableOpacity>
    </View>
  );
}
