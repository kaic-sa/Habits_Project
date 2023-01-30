import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface ListProps {
  date: Date;
}
interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function ListHabits({ date }: ListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    api
      .get("/day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => setHabitsInfo(response.data));
  }, []);

  const isDayInPast = dayjs(date).endOf("day").isBefore(new Date());

  async function handleToggle(habitId: string) {
    const isHabitAlready = habitsInfo!.completedHabits.includes(habitId);
    await api.patch(`/habits/${habitId}/toggle`);
    let completedHabits: string[] = [];
    if (isHabitAlready) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });
  }

  return (
    <div className="mt-4 flex flex-col gap-3 border-0 ">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            onCheckedChange={() => handleToggle(habit.id)}
            key={habit.id}
            disabled={isDayInPast}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            className="flex items-center group "
            style={{ outline: "none" }}
          >
            <div className="h-8 w-8 rounded-lg flex items-center -ml-5 justify-center  bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className=" ml-3 font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
