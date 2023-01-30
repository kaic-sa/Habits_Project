import { prisma } from "./prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import dayjs from "dayjs";

export async function appRoute(app: FastifyInstance) {
  //rota para criação de um habito
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);
    const today = dayjs().startOf("day").toDate();
    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return { week_day: weekDay };
          }),
        },
      },
    });
  });
  //rota que retorna os habitos registrados disponiveis naquele dia, e se foram completos ou não
  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });
    const { date } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date).startOf("day"); // Retorna a data ignorando seu valor DIA com h/m zerados
    const weekDay = dayjs(date).get("day");
    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });
    //essa função filtra dentro do dia os habitos completados e só retorna o ID de cada habito
    const completedHabits =
      day?.dayHabits.map((dayHabit) => {
        return dayHabit.habit_id;
      }) ?? [];
    return {
      possibleHabits,
      completedHabits,
    };
  });

  // rota pra marcar e desmarcar tarefas
  app.patch("/habits/:id/toggle", async (request) => {
    const toggleHabitParams = z.object({ id: z.string().uuid() });
    const { id } = toggleHabitParams.parse(request.params);
    const today = dayjs().startOf("day").toDate();
    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });
    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });
    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  });
  // rota resumo de dias, retorna dias em que houve habitos completos, entre os habitos disponiveis, completos e sua quantidade
  app.get("/summary", async () => {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.Date, 
        (
          SELECT 
            cast (count(*) as float) 
          FROM day_habits DH
          WHERE DH.day_id =  D.id
        ) as completed, (
          SELECT cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast( strftime('%w', D.date/1000.0,'unixepoch') as int)
            AND H.created_at <= D.date

        )as amount
      FROM day D
    `;
    return summary;
  });
}
