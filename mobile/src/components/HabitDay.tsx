import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const day_size =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
  amount?: number;
  completed?: number;
  date: Date;
}

export function HabitDay({ amount = 0, completed = 0, date, ...rest }: Props) {
  const accomplishedPercentage =
    amount > 0 ? generateProgressPercentage(amount, completed) : 0;

  // const accomplishedPercentage = Math.round(Math.random() * 40); < - desmarcar essa linha para gerar efeitos visuais a nivel de teste
  const today = dayjs().startOf("day").toDate();
  const highlight = dayjs(today).isSame(date, "day");

  return (
    <TouchableOpacity
      style={{ width: day_size, height: day_size }}
      className={clsx(" border-2 m-1 rounded-lg ", {
        " bg-zinc-900 border-2 border-zinc-800": accomplishedPercentage === 0,
        "bg-violet-900 border-violet-700":
          accomplishedPercentage > 0 && accomplishedPercentage < 20,
        "bg-violet-800 border-violet-600":
          accomplishedPercentage >= 20 && accomplishedPercentage < 40,
        "bg-violet-700 border-violet-500":
          accomplishedPercentage >= 40 && accomplishedPercentage < 60,
        "bg-violet-600 border-violet-400":
          accomplishedPercentage >= 60 && accomplishedPercentage < 80,
        "bg-violet-500 border-violet-400": accomplishedPercentage >= 80,
        "border-green-100 border-4": highlight == true,
      })}
      activeOpacity={0.7}
      {...rest}
    ></TouchableOpacity>
  );
}
