import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./progressBar";
import clsx from "clsx";

import dayjs from "dayjs";
import { ListHabits } from "./ListHabits";
import { useState } from "react";

interface HabitDayProps {
  defaultCompleted?: number;
  amount?: number;
  date: Date;
}

export function HabitDay({
  defaultCompleted = 0,
  amount = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);
  const completedP = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500",
          {
            " bg-zinc-900 border-2 border-zinc-800": completedP === 0,
            "bg-violet-900 border-violet-700":
              completedP > 0 && completedP < 20,
            "bg-violet-800 border-violet-600":
              completedP >= 20 && completedP < 40,
            "bg-violet-700 border-violet-500":
              completedP >= 40 && completedP < 60,
            "bg-violet-600 border-violet-400":
              completedP >= 60 && completedP < 80,
            "bg-violet-500 border-violet-400": completedP >= 80,
          }
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 leading-tight font-extrabold text-3xl">
            {dayAndMonth}
          </span>
          <ProgressBar progress={completedP} />
          <ListHabits
            onCompletedChanged={handleCompletedChanged}
            date={date}
          ></ListHabits>
          <Popover.Arrow
            height={8}
            width={16}
            className="fill-zinc-900"
          ></Popover.Arrow>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
