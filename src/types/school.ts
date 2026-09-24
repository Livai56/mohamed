export type { User, UserRole } from "@/types/auth";

export type DashboardStat = {
  label: string;
  value: string;
  change: string;
  icon: keyof typeof import("@expo/vector-icons").MaterialCommunityIcons.glyphMap;
  tone: "teal" | "orange" | "blue" | "pink";
};

export type QuickAction = {
  label: string;
  description: string;
  icon: keyof typeof import("@expo/vector-icons").MaterialCommunityIcons.glyphMap;
  tone: "teal" | "orange" | "blue";
};

export type Activity = {
  id: string;
  title: string;
  detail: string;
  time: string;
  icon: keyof typeof import("@expo/vector-icons").MaterialCommunityIcons.glyphMap;
  tone: "teal" | "orange" | "blue";
};

export type Student = {
  id: string;
  name: string;
  className: string;
  attendance: number;
  average: string;
  status: "Présent" | "Absent" | "En retard";
};

export type Message = {
  id: string;
  sender: string;
  preview: string;
  time: string;
  unread?: boolean;
  role?: string;
};