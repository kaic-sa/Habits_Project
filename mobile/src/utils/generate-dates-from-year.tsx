import dayjs from "dayjs";

export function generateDatesFromYear() {
  const firstDayOfTheYear = dayjs().startOf("year");
  const today = new Date();
  const dates = [];
  let comparDate = firstDayOfTheYear;
  while (comparDate.isBefore(today)) {
    dates.push(comparDate.toDate());
    comparDate = comparDate.add(1, "day");
  }
  return dates;
}
