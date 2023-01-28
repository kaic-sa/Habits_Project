import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabit() {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekdayIndex: number) {
    if (weekDays.includes(weekdayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((day) => day !== weekdayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekdayIndex]);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 250 }}
      >
        <BackButton></BackButton>

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>
        <Text className="mt-6 text-white font-semibold">
          No que você se compremete?
        </Text>

        <TextInput
          placeholder="Hobbies, saúde, disciplina..."
          placeholderTextColor={colors.zinc[400]}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white border-2 border-zinc-500 focus:border focus:border-violet-500"
        ></TextInput>
        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Em quantos dias da semana?
        </Text>

        {availableWeekDays.map((weekday, index) => (
          <CheckBox
            key={index}
            title={weekday}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          ></CheckBox>
        ))}
        <TouchableOpacity
          className=" w-full h-14 flex-row items-center justify-center bg-green-500 rounded-md mt-6"
          activeOpacity={0.7}
        >
          <Entypo name="check" size={20} color={colors.white}></Entypo>
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
