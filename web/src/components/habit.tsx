interface HabitProps {
  teste: string;
}

export function Habit(props: HabitProps) {
  return (
    <div className="bg-slate-600 w-1000 h-100  m-2 text-center  items-center">
      {props.teste}
    </div>
  );
}
