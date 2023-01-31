import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, {
  RotateInUpLeft,
  RotateOutUpRight,
} from "react-native-reanimated";

interface Props extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function CheckBox({ checked = false, title, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          entering={RotateInUpLeft}
          exiting={RotateOutUpRight}
        >
          <Entypo name="check" size={20} color={colors.white}></Entypo>
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg"></View>
      )}
      <Text className="text-white text-base ml-3 ">{title}</Text>
    </TouchableOpacity>
  );
}
