import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
const availableWeekDays = [
  "Domingo",
  "Segunda",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDay] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();
    if (!title || weekDays.length === 0) {
      return;
    }

    await api.post("habits", {
      title,
      weekDays,
    });
    setTitle("");
    setWeekDay([]);
    alert("Hábito registrado com sucesso !");
  }

  function handleToggleWeekDay(dayIndex: number) {
    if (weekDays.includes(dayIndex)) {
      const weekIndexRemoved = weekDays.filter((day) => day !== dayIndex);
      setWeekDay(weekIndexRemoved);
    } else {
      const weekIndexAdded = [...weekDays, dayIndex];
      setWeekDay(weekIndexAdded);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label
        className="pt-0 mt-1 font-extrabold text-3xl leading-tight"
        htmlFor="title"
      >
        Criar hábito
      </label>
      <span>Qual seu comprometimento</span>
      <input
        className="p-2 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        type="text"
        id="title"
        placeholder="ex.: hobbies, saúde, disciplina "
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></input>
      <label className="font-semibold leading-tight mt-4">Quantas vezes?</label>

      {availableWeekDays.map((day, index) => {
        return (
          <div className="mt-3 flex flex-col gap-2 border-0 ">
            <Checkbox.Root
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
              key={`${day}${index}`}
              className="flex items-center gap-3 group pt-0 pb-0"
            >
              <div className="h-8 w-8 rounded-lg flex items-center -ml-5 justify-center  bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className=" ml-3  text-white leading-tight ">{day}</span>
            </Checkbox.Root>
          </div>
        );
      })}

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center font-semibold justify-center bg-green-600 gap-3 hover:bg-green-500"
      >
        <Check size={20} weight="bold"></Check>
        Confirmar
      </button>
    </form>
  );
}
