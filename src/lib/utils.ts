import { clsx, type ClassValue } from "clsx";
import { DateArg, formatDate } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateBR = (date: DateArg<Date>) =>
  formatDate(date, "dd/MM/yyyy");
