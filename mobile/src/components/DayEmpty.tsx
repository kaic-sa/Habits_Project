import { Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function DayEmpty() {
  const { navigate } = useNavigation();

  return (
    <Text className="text-white text-base">
      Não há hábitos listados para este dia.
      <Text
        className="text-violet-400 text-base underline active:via-violet-500"
        onPress={() => navigate("new")}
      >
        {" "}
        Crie um novo hábito agora.
      </Text>
    </Text>
  );
}
