"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DayButton from "./DayButton";

function WeekNav({ workouts }) {
  const searchParams = useSearchParams();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const today = new Date();
  const initialStartDate = getMonday(today);

  const [startDate, setStartDate] = useState(initialStartDate);
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      const [year, month, day] = dateParam.split("-").map(Number);
      const parsedDate = new Date(year, month - 1, day);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        setStartDate(getMonday(parsedDate));
      }
    }
  }, [searchParams]);

  function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function getDateForDay(index) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  }

  function updateUrlParams(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const params = new URLSearchParams(window.location.search);
    params.set("date", dateString);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  }

  function handleDayClick(index) {
    const date = getDateForDay(index);
    setSelectedDate(date);
    updateUrlParams(date);
  }

  function nextWeek() {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);

    const newSelectedDate = new Date(selectedDate);
    newSelectedDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newSelectedDate);
    updateUrlParams(newSelectedDate);
  }

  function prevWeek() {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);

    const newSelectedDate = new Date(selectedDate);
    newSelectedDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newSelectedDate);
    updateUrlParams(newSelectedDate);
  }
  return (
    <div className="flex items-center justify-between max-w-2xl px-4 py-3 mx-auto overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900">
      <button
        onClick={prevWeek}
        className="p-2 text-gray-600 transition rounded-full hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 shrink-0"
      >
        <ChevronLeft />
      </button>

      {/* Scrollable days row */}
      <div className="flex gap-1 px-1 overflow-x-auto sm:gap-2">
        {days.map((day, i) => {
          const dayDate = getDateForDay(i);
          const isSelected =
            selectedDate?.toDateString() === dayDate.toDateString();

          const hasWorkout = workouts?.some((w) => {
            const [year, month, day] = w.date.split("-");
            const workoutDate = new Date(+year, +month - 1, +day);
            return workoutDate.toDateString() === dayDate.toDateString();
          });

          return (
            <DayButton
              key={day}
              day={day}
              date={dayDate}
              isSelected={isSelected}
              hasWorkout={hasWorkout}
              onClick={() => handleDayClick(i)}
            />
          );
        })}
      </div>

      <button
        onClick={nextWeek}
        className="p-2 text-gray-600 transition rounded-full hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 shrink-0"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default WeekNav;
