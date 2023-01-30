import { useEffect, useState } from "react";
import { generateDatesFromYear } from "../utils/generate-dates-from-year";
import { HabitDay } from "./HabitDay";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const chartDates = generateDatesFromYear();
const minimumChartDates = 18 * 7;
const amountOfDaystoFill = minimumChartDates - chartDates.length;

type summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>; // type summary = {}[] outra forma de tipar um array heterogeneo

export function MainChart() {
  const [summary, setSummary] = useState<summary>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, i) => {
          return (
            <div
              key={i}
              className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold"
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3  ">
        {chartDates.map((day) => {
          const dayInSummary = summary.find((D) => {
            return dayjs(day).isSame(D.date, "day");
          });
          return (
            <HabitDay
              date={day}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
              key={day.toString()}
            />
          );
        })}
        {amountOfDaystoFill > 0 &&
          Array.from({ length: amountOfDaystoFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              ></div>
            );
          })}
      </div>
    </div>
  );
}
