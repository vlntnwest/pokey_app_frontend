import { Box } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import Picker from "react-mobile-picker";

const OrderDate = () => {
  const [selectedDate, setSelectedDate] = useState({ date: "", time: "" });

  const isSundayOrMonday = (date) => {
    const dayOfWeek = date.day();
    return dayOfWeek === 0 || dayOfWeek === 1;
  };

  let dates = [];

  const today = dayjs();
  if (!isSundayOrMonday(today)) {
    dates.push({
      label: "Aujourd'hui",
      getValue: () => today,
    });
  }

  const tomorrow = dayjs().add(1, "day");
  if (!isSundayOrMonday(tomorrow)) {
    dates.push({
      label: "Demain",
      getValue: () => tomorrow,
    });
  }

  const generateTimeSlots = (start, end, step) => {
    const slots = [];
    let current = start;

    while (current.isBefore(end)) {
      const next = current.add(step, "minute");

      if (next.isAfter(end)) break;

      slots.push(`${current.format("HH:mm")} - ${next.format("HH:mm")}`);
      current = next;
    }

    return slots;
  };

  const lunchStart = dayjs().hour(11).minute(45);
  const lunchEnd = dayjs().hour(14).minute(0);
  const dinnerStart = dayjs().hour(18).minute(30);
  const dinnerEnd = dayjs().hour(22).minute(0);

  const interval = 15; // minutes

  const lunchSlots = generateTimeSlots(lunchStart, lunchEnd, interval);
  const dinnerSlots = generateTimeSlots(dinnerStart, dinnerEnd, interval);

  const times = [...lunchSlots, ...dinnerSlots];

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Box sx={{ width: "100%" }}>
        <Picker value={selectedDate} onChange={setSelectedDate}>
          <Picker.Column name="date">
            {dates.map((day, index) => (
              <Picker.Item key={index} value={day.label}>
                {day.label}
              </Picker.Item>
            ))}
          </Picker.Column>
          <Picker.Column name="time">
            {times.map((time, index) => (
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
