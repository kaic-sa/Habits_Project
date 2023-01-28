import { Text, ScrollView, TouchableOpacityProps, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
interface Params {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;
  const parsedDate = dayjs(date);
  const day_week = parsedDate.format("dddd");
  const day_month = parsedDate.format("DD/MM");

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton></BackButton>
        <Text className="text-zinc-400 mt-6 text-base ">{day_week}</Text>
        <Text className="text-white font-extrabold text-3xl">{day_month}</Text>
        <ProgressBar progress={20}></ProgressBar>
        <View className="mt-4">
          <CheckBox title="Caminhar" checked={false}></CheckBox>
        </View>
      </ScrollView>
    </View>
  );
}
