/* eslint-disable @typescript-eslint/no-explicit-any */
export const isNumeric = (str: string) => {
  return /^\d+$/.test(str);
};

export const cx = (...classNames: (string | (() => string))[]): string =>
  classNames
    .map((className) =>
      typeof className === "function" ? className() : className,
    )
    .filter(Boolean)
    .join(" ");

export const numbersOnly = (e: any) => {
  if (isNaN(e?.key) && e?.key !== "Backspace") {
    e.preventDefault();
  }
};

export const formatNumber = (value: string | number | any) => {
  if (value === null || value === undefined || isNaN(+value)) {
    return "0";
  }

  let val: string | number = parseFloat(value);
  if (isNaN(val)) {
    return "0";
  }

  if (!String(value).includes(".")) {
    return `${Number(val).toLocaleString("en-US")}`;
  }

  val = val.toFixed(2);
  return `${Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) {
    return "N/A";
  }

  const date = new Date(dateString);
  const monthName = date.toLocaleString("default", { month: "short" });

  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
};

export const isObjectEmpty = (obj: any) => {
  if (obj === null) return true;
  return Object.keys(obj).length === 0;
};

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export const scrollWindowToTop = () => {
  try {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  } catch (error: any) {
    console.log(error);
    window.scrollTo(0, 0);
  }
};

export const clearSessionAndLogout = async () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.assign("/");
};

export const getInitials = (name: string): string => {
  const nameParts = name.trim().split(/\s+/);
  const initials = nameParts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials.padEnd(2, initials.charAt(0));
};

export const formatChatDate = (date: Date | string): string => {
  try {
    const now = new Date();
    const inputDate = new Date(date);

    const isSameDay = now.toDateString() === inputDate.toDateString();
    const isSameWeek = (() => {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay()); // Set to Sunday (start of the week)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Saturday (end of the week)
      return inputDate >= startOfWeek && inputDate <= endOfWeek;
    })();

    if (isSameDay) {
      // Show time in AM/PM format
      return inputDate
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
        ?.toLocaleLowerCase();
    } else if (isSameWeek) {
      // Show the day of the week
      return inputDate.toLocaleDateString("en-US", { weekday: "short" }); // E.g., "Tue"
    } else {
      // Show the date (e.g., 2 Jan)
      return inputDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }); // E.g., "2 Jan"
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return ""; // Return an empty string if an error occurs
  }
};
