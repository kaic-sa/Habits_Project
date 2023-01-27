//import { Habit } from "./components/habit";
import "./lib/dayjs";
import "./styles/global.css";
import { Header } from "./components/header";
import { MainChart } from "./components/mainChart";
export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex-col gap-16">
        <Header></Header>
        <MainChart></MainChart>
      </div>
    </div>
  );
}
