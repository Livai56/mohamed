import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { schoolApi } from "@/services/api";
import type { Message } from "@/types/school";

const demoMessages: Message[] = [
	{ id: "1", sender: "Mme Diallo", role: "Enseignante · 4e B", preview: "Bonjour, le devoir de mathématiques est disponible.", time: "09:42", unread: true },
	{ id: "2", sender: "Administration", role: "Direction", preview: "La réunion de parents aura lieu vendredi.", time: "Hier" },
	{ id: "3", sender: "M. Kone", role: "Parent d'élève", preview: "Merci pour le suivi de Mariam.", time: "Lun." },
];

export default function MessagesScreen() {
	const { token } = useAuth();
	const [messages, setMessages] = useState(demoMessages);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (!token) return;
		setLoading(true);
		schoolApi.getMessages(token).then(setMessages).catch(() => undefined).finally(() => setLoading(false));
	}, [token]);
	return (
		<View className="flex-1 bg-[#f7faf8] px-5 pt-14">
			<View className="flex-row items-center justify-between"><View><Text className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#78908a]">Communication</Text><Text className="mt-2 text-[28px] font-extrabold text-[#173f43]">Messages</Text></View><Pressable className="h-11 w-11 items-center justify-center rounded-2xl bg-[#13786c] active:opacity-70"><MaterialCommunityIcons name="pencil-outline" size={21} color="white" /></Pressable></View>
			{loading ? <ActivityIndicator className="mt-6" color="#13786c" /> : null}
			<FlatList data={messages} keyExtractor={(item) => item.id} contentContainerClassName="pb-8 pt-6" renderItem={({ item }) => <View className="mb-3 flex-row rounded-[20px] border border-[#e5ece8] bg-white p-4"><View className="h-11 w-11 items-center justify-center rounded-full bg-[#e8efff]"><Text className="text-[15px] font-extrabold text-[#3f67c8]">{item.sender.split(" ").map((part) => part[0]).join("").slice(0, 2)}</Text></View><View className="ml-3 flex-1"><View className="flex-row items-start"><View className="flex-1"><Text className="text-[15px] font-extrabold text-[#173f43]">{item.sender}</Text><Text className="mt-1 text-[11px] text-[#78908a]">{item.role}</Text></View><Text className="text-[11px] text-[#9aa9a5]">{item.time}</Text></View><Text numberOfLines={2} className="mt-3 text-[13px] leading-5 text-[#788a86]">{item.preview}</Text>{item.unread ? <View className="mt-3 h-2 w-2 rounded-full bg-[#13786c]" /> : null}</View></View>} />
		</View>
	);
}
