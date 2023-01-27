import { Dimensions, TouchableOpacity } from "react-native";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const day_size =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

export function HabitDay() {
  return (
    <TouchableOpacity
      style={{ width: day_size, height: day_size }}
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      activeOpacity={0.7}
    ></TouchableOpacity>
  );
}
