import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const ShopContext = createContext({});

export function useShop() {
  return useContext(ShopContext);
}

export default function ShopProvider({ children }) {
  const [canOrderNow, setCanOrderNow] = useState(false);

  const openingHours = useMemo(() => {
    return {
      lunchStart: dayjs().hour(12).minute(0),
      lunchEnd: dayjs().hour(17).minute(30),
      dinnerStart: dayjs().hour(18).minute(30),
      dinnerEnd: dayjs().hour(22).minute(0),
    };
  }, []);

  const calculOrderTimeRange = useCallback(() => {
    const now = dayjs();

    const minTime = now.add(15, "minute");
    const maxTime = now.add(30, "minute");

    const isInLunch =
      minTime.isBetween(openingHours.lunchStart, openingHours.lunchEnd) &&
      maxTime.isBetween(openingHours.lunchStart, openingHours.lunchEnd);

    const isInDinner =
      minTime.isBetween(openingHours.dinnerStart, openingHours.dinnerEnd) &&
      maxTime.isBetween(openingHours.dinnerStart, openingHours.dinnerEnd);

    if (isInLunch || isInDinner) {
      setCanOrderNow(true);
      return `${minTime.format("HH:mm")} - ${maxTime.format("HH:mm")}`;
    } else {
      setCanOrderNow(false);
    }
  }, [openingHours]);

  useEffect(() => {
    calculOrderTimeRange();
  }, [calculOrderTimeRange]);

  return (
    <ShopContext.Provider
      value={{
        canOrderNow,
        openingHours,
        calculOrderTimeRange,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
