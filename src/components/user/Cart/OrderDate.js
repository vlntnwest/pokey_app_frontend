import { Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import Picker from "react-mobile-picker";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

const OrderDate = () => {
  const { selectedDate, setSelectedDate } = useShoppingCart();

  // Function to check if a date is Sunday (0) or Monday (1)
  const isSundayOrMonday = (date) => {
    const dayOfWeek = date.day();
    return dayOfWeek === 0 || dayOfWeek === 1;
  };

  // Generate available dates: today and tomorrow (if not Sunday or Monday)
  const availableDates = useMemo(() => {
    const dates = [];

    const today = dayjs();
    const tomorrow = dayjs().add(1, "day");

    if (!isSundayOrMonday(today)) {
      dates.push({
        label: "Aujourd'hui",
        value: today,
      });
    }

    if (!isSundayOrMonday(tomorrow)) {
      dates.push({
        label: "Demain",
        value: tomorrow,
      });
    }

    return dates;
  }, []);

  // Function to generate time slots between start and end with a given step (minutes)
  const generateTimeSlots = (start, end, step, minTime = null) => {
    const slots = [];
    let current = start;

    while (current.isBefore(end)) {
      const next = current.add(step, "minute");

      if (next.isAfter(end)) break;

      // Skip slots before the minimum allowed time
      if (minTime && current.isBefore(minTime)) {
        current = next;
        continue;
      }

      slots.push(`${current.format("HH:mm")} - ${next.format("HH:mm")}`);
      current = next;
    }

    return slots;
  };

  // Memoized time slots based on selected date
  const availableTimes = useMemo(() => {
    // Find the day corresponding to the selected label
    const selectedDayObj = availableDates.find(
      (d) => d.label === selectedDate.date
    );

    if (!selectedDayObj) return [];

    const selectedDay = selectedDayObj.value;
    const now = dayjs();
    const minimumTime = selectedDay.isSame(now, "day")
      ? now.add(30, "minute")
      : null;

    // Define lunch and dinner time windows
    const lunchStart = selectedDay.hour(11).minute(45);
    const lunchEnd = selectedDay.hour(14).minute(0);

    const dinnerStart = selectedDay.hour(18).minute(30);
    const dinnerEnd = selectedDay.hour(22).minute(0);

    const interval = 15;

    const lunchSlots = generateTimeSlots(
      lunchStart,
      lunchEnd,
      interval,
      minimumTime
    );
    const dinnerSlots = generateTimeSlots(
      dinnerStart,
      dinnerEnd,
      interval,
      minimumTime
    );

    return [...lunchSlots, ...dinnerSlots];
  }, [selectedDate.date, availableDates]);

  useEffect(() => {
    const dayOfWeek = dayjs().day();
    if (dayOfWeek === 1) {
      setSelectedDate({ date: "Demain", time: "" });
    }
  }, [setSelectedDate]);

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Box sx={{ width: "100%" }}>
        <Picker
          value={selectedDate}
          onChange={(newValue) =>
            setSelectedDate((prev) => ({
              ...prev,
              ...newValue,
            }))
          }
        >
          <Picker.Column name="date">
            {availableDates.map((day, index) => (
              <Picker.Item key={index} value={day.label}>
                {day.label}
              </Picker.Item>
            ))}
          </Picker.Column>
          <Picker.Column name="time">
            {availableTimes.map((time, index) => (
              <Picker.Item key={index} value={time}>
                {time}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </Box>
    </Box>
  );
};

export default OrderDate;
