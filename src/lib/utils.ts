import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(dateTime: string) {
  const currentDate = new Date();
  const inputDate = new Date(dateTime);

  const timeDiff = currentDate.getTime() - inputDate.getTime();
  const secondsDiff = timeDiff / 1000;

  if (secondsDiff < 60) {
    return `${Math.floor(secondsDiff)} seconds ago`;
  } else if (secondsDiff < 3600) {
    return `${Math.floor(secondsDiff / 60)} minutes ago`;
  } else if (secondsDiff < 86400) {
    return `${Math.floor(secondsDiff / 3600)} hours ago`;
  } else {
    return `${Math.floor(secondsDiff / 86400)} days ago`;
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formatted = date.toLocaleDateString("de-AT", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formatted} at ${time}`;
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);