import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function SettingsScreen() {
	const { user, signOut } = useAuth();
	return (
		<ScrollView className="flex-1 bg-[#f7faf8]" contentContainerClassName="px-5 pb-10 pt-14"><Text className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#78908a]">Compte</Text><Text className="mt-2 text-[28px] font-extrabold text-[#173f43]">Réglages</Text><View className="mt-6 flex-row items-center rounded-[22px] border border-[#e5ece8] bg-white p-4"><View className="h-14 w-14 items-center justify-center rounded-full bg-[#e2f3ee]"><Text className="text-[18px] font-extrabold text-[#13786c]">{user?.firstName?.[0]}{user?.lastName?.[0]}</Text></View><View className="ml-3 flex-1"><Text className="text-[16px] font-extrabold text-[#173f43]">{user?.firstName} {user?.lastName}</Text><Text className="mt-1 text-[12px] text-[#788a86]">{user?.email}</Text></View></View><View className="mt-6 overflow-hidden rounded-[22px] border border-[#e5ece8] bg-white"><SettingRow icon="bell-outline" label="Notifications" detail="Activées" /><SettingRow icon="shield-check-outline" label="Sécurité" detail="Session protégée" /><SettingRow icon="school-outline" label="Établissement" detail={user?.schoolName ?? "Mon établissement"} /></View><Pressable onPress={signOut} className="mt-6 flex-row items-center justify-center rounded-2xl border border-[#ffd7dd] bg-[#fff7f8] py-4 active:opacity-70"><MaterialCommunityIcons name="logout" size={19} color="#c84f61" /><Text className="ml-2 text-[14px] font-extrabold text-[#c84f61]">Se déconnecter</Text></Pressable></ScrollView>
	);
}

function SettingRow({ icon, label, detail }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string; detail: string }) {
	return <View className="flex-row items-center border-b border-[#eef2f0] px-4 py-4 last:border-b-0"><MaterialCommunityIcons name={icon} size={21} color="#13786c" /><Text className="ml-3 flex-1 text-[14px] font-bold text-[#173f43]">{label}</Text><Text className="text-[12px] text-[#788a86]">{detail}</Text><MaterialCommunityIcons name="chevron-right" size={19} color="#9aa9a5" /></View>;
}
