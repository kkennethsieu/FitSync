"use client";
import "@/app/globals.css";
import { Card, CardContent } from "@/components/ui/card";
import { format, isSameDay, parseISO } from "date-fns";
import { Flame } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function HeatCalendar({ workouts }) {
  const pathname = usePathname();

  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date"); // could be yyyy-MM or yyyy-MM-dd

  // State to control calendar month shown
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  // State to control which exact date is selected
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (dateParam) {
      // Try parsing full yyyy-MM-dd first
      let parsedDate = null;
      try {
        parsedDate = parseISO(dateParam);
      } catch {
        parsedDate = null;
      }

      if (parsedDate && !isNaN(parsedDate)) {
        setSelectedDate(parsedDate);
        // For calendar view, set activeStartDate to first of month
        setActiveStartDate(
          new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1)
        );
      } else {
        // fallback for yyyy-MM format (no day)
        const [yearStr, monthStr] = dateParam.split("-");
        if (yearStr && monthStr) {
          const year = parseInt(yearStr, 10);
          const month = parseInt(monthStr, 10) - 1;
          setActiveStartDate(new Date(year, month, 1));
          setSelectedDate(new Date(year, month, 1)); // default select first day of month
        }
      }
    } else {
      // no param, default today
      const today = new Date();
      setSelectedDate(today);
      setActiveStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
    }
  }, [dateParam]);

  // Filter completed and planned dates for active month
  const workoutCompletedDates = workouts
    .filter((w) => w.date && w.completed)
    .filter((w) => {
      const d = new Date(w.date);
      return (
        d.getMonth() === activeStartDate.getMonth() &&
        d.getFullYear() === activeStartDate.getFullYear()
      );
    })
    .map((w) => format(parseISO(w.date), "yyyy-MM-dd"));

  const workoutPlannedDates = workouts
    .filter((w) => w.date && !w.completed)
    .filter((w) => {
      const d = new Date(w.date);
      return (
        d.getMonth() === activeStartDate.getMonth() &&
        d.getFullYear() === activeStartDate.getFullYear()
      );
    })
    .map((w) => format(parseISO(w.date), "yyyy-MM-dd"));

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return "";
    if (isSameDay(date, new Date())) return "today-day";

    const formatted = format(date, "yyyy-MM-dd");
    if (workoutCompletedDates.includes(formatted))
      return "workout-completed-day";
    if (workoutPlannedDates.includes(formatted)) return "workout-planned-day";
    return "";
  };

  const formatShortWeekday = (locale, date) =>
    format(date, "EEE").toUpperCase();

  function handleOnClickDay(date) {
    const fullDate = format(date, "yyyy-MM-dd");
    const monthOnly = format(date, "yyyy-MM");

    setSelectedDate(date);

    // Only update to full date if original param had day
    if (pathname.includes("/activities")) {
      router.push(`?date=${fullDate}`, { scroll: false });
    } else if (pathname.includes("/analytics")) {
      router.push(`?date=${monthOnly}`, { scroll: false });
    }
  }

  return (
    <Card className="w-full bg-white rounded-lg dark:bg-gray-800">
      <CardContent className="max-w-full py-2 mx-auto overflow-x-auto">
        <h2 className="flex items-center justify-center gap-1 mb-2 text-xl font-bold text-center text-orange-600 select-none">
          <Flame />
          Daily Burn Calendar
          <Flame />
        </h2>
        <div className="max-w-full">
          <Calendar
            activeStartDate={activeStartDate}
            value={selectedDate}
            view="month"
            tileClassName={({ date, view }) => {
              // Example: Add dark mode classes and custom tile classes here
              let baseClasses = "text-gray-900 dark:text-gray-100";
              if (tileClassName) {
                baseClasses += " " + tileClassName({ date, view });
              }
              return baseClasses;
            }}
            formatShortWeekday={(locale, date) =>
              formatShortWeekday
                ? formatShortWeekday(locale, date)
                : date.toLocaleDateString(locale, { weekday: "short" })
            }
            prevLabel={
              <span className="font-bold text-orange-500 cursor-pointer dark:text-orange-400">
                ←
              </span>
            }
            nextLabel={
              <span className="font-bold text-orange-500 cursor-pointer dark:text-orange-400">
                →
              </span>
            }
            next2Label={null}
            prev2Label={null}
            onActiveStartDateChange={({ activeStartDate }) => {
              setActiveStartDate(activeStartDate);
              const formattedMonth = format(activeStartDate, "yyyy-MM");

              if (pathname.includes("/analytics")) {
                router.push(`?date=${formattedMonth}`, { scroll: false });
              }
            }}
            onClickDay={(e) => handleOnClickDay(e)}
            selected={selectedDate}
          />
        </div>
      </CardContent>
    </Card>
  );
}
