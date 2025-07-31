import {
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export function formatDisplayDate(dateString) {
  if (!dateString) return "";

  // Manually parse to avoid timezone shift
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day); // month is 0-based

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function getToday() {
  return new Date().toLocaleDateString("en-CA"); // "2025-07-09"
}

export function getTimeToday() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }); // e.g., "2:38:45 PM"
}

export function getWeeksInMonth(date) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  const weeks = [];
  let currentWeekStart = startOfWeek(monthStart, { weekStartsOn: 0 });

  while (
    isBefore(currentWeekStart, monthEnd) ||
    currentWeekStart.getTime() === monthEnd.getTime()
  ) {
    const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 0 });
    const label = `${format(currentWeekStart, "MM/dd")} - ${format(
      currentWeekEnd,
      "MM/dd"
    )}`;
    weeks.push({ start: currentWeekStart, end: currentWeekEnd, label });
    currentWeekStart = addWeeks(currentWeekStart, 1);
  }

  return weeks;
}

import dayjs from "dayjs";

export function getLongestStreak(workouts) {
  if (!workouts.length) return 0;

  // Filter only completed workouts
  const completedWorkouts = workouts.filter((w) => w.completed);

  // If no completed workouts, streak is 0
  if (completedWorkouts.length === 0) return 0;

  // Create a set of unique workout dates (YYYY-MM-DD)
  const dateSet = new Set(
    completedWorkouts.map((w) => dayjs(w.date).format("YYYY-MM-DD"))
  );

  const sortedDates = Array.from(dateSet)
    .map((dateStr) => dayjs(dateStr))
    .sort((a, b) => a.diff(b));

  let longest = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = sortedDates[i - 1];
    const curr = sortedDates[i];

    if (curr.diff(prev, "day") === 1) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }

    if (currentStreak > longest) {
      longest = currentStreak;
    }
  }

  return longest;
}

export function getMostFrequentCategory(workouts) {
  // Filter only completed workouts
  const completedWorkouts = workouts.filter((w) => w.completed);

  if (completedWorkouts.length === 0) return null;

  // Count occurrences of each category
  const categoryCounts = completedWorkouts.reduce((acc, workout) => {
    acc[workout.category] = (acc[workout.category] || 0) + 1;
    return acc;
  }, {});

  // Find the category with the highest count
  let mostFrequentCategory = null;
  let maxCount = 0;

  for (const [category, count] of Object.entries(categoryCounts)) {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentCategory = category;
    }
  }

  return { category: mostFrequentCategory, count: maxCount };
}

export function getAvailableMonthsYears(workouts) {
  const set = new Set();

  workouts.forEach(({ date }) => {
    const d = dayjs(date);
    if (!d.isValid()) return;

    const key = d.format("YYYY-MM");
    set.add(key);
  });

  const sorted = Array.from(set).sort((a, b) => (a < b ? 1 : -1));

  return sorted.map((ym) => {
    const [year, month] = ym.split("-");
    const label = dayjs(`${year}-${month}-01`).format("MMMM YYYY");
    return { value: ym, label, year, month };
  });
}

export function getCurrentYearMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
}

export function formatTime(value) {
  if (!value || typeof value !== "string") return "";

  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "").slice(0, 6);

  let hours = "00";
  let minutes = "00";
  let seconds = "00";

  if (digits.length <= 2) {
    // SS only
    seconds = digits.padStart(2, "0");
  } else if (digits.length <= 4) {
    // MMSS
    minutes = digits.slice(0, digits.length - 2).padStart(2, "0");
    seconds = digits.slice(-2);
  } else {
    // HHMMSS
    hours = digits.slice(0, digits.length - 4).padStart(2, "0");
    minutes = digits.slice(-4, -2);
    seconds = digits.slice(-2);
  }

  if (hours === "00") {
    return `${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
}

export function formatTimeWithDateFns(timeString) {
  const [hours, minutes, seconds] = timeString.split(":");
  const now = new Date();
  const dateWithTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds
  );
  return format(dateWithTime, "h:mm a"); // or "HH:mm"
}

export function getCurrentWeekRange() {
  const now = new Date();

  // startOfWeek defaults to Sunday, so specify { weekStartsOn: 1 } to start Monday
  const monday = startOfWeek(now, { weekStartsOn: 1 });
  const sunday = endOfWeek(now, { weekStartsOn: 1 });

  return { monday, sunday };
}
