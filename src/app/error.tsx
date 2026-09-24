import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  return <View className="flex-1 items-center justify-center bg-[#f7faf8] px-6"><View className="h-16 w-16 items-center justify-center rounded-[22px] bg-[#ffe6ed]"><MaterialCommunityIcons name="alert-outline" size={32} color="#c84f61" /></View><Text className="mt-6 text-center text-[25px] font-extrabold text-[#173f43]">Une erreur est survenue</Text><Text className="mt-2 text-center text-[14px] leading-5 text-[#788a86]">{error.message || "Impossible de charger cette page."}</Text><Pressable onPress={retry} className="mt-6 rounded-2xl bg-[#13786c] px-6 py-4 active:opacity-80"><Text className="text-[14px] font-extrabold text-white">Réessayer</Text></Pressable></View>;
}