import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { schoolApi } from "@/services/api";
import { students as demoStudents } from "@/data/dashboard";
import type { Student } from "@/types/school";

export default function StudentsScreen() {
	const { token, user } = useAuth();
	const [students, setStudents] = useState<Student[]>(demoStudents);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!token) return;
		setLoading(true);
		const request = user?.role === "PARENT" ? schoolApi.getChildren(token) : schoolApi.getStudents(token);
		request.then(setStudents).catch(() => undefined).finally(() => setLoading(false));
	}, [token, user?.role]);

	const filteredStudents = students.filter((student) => `${student.name} ${student.className}`.toLowerCase().includes(query.toLowerCase()));
	return (
		<View className="flex-1 bg-[#f7faf8] px-5 pt-14">
			<Text className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#78908a]">Scolarité</Text>
			<View className="mt-2 flex-row items-center justify-between"><Text className="text-[28px] font-extrabold text-[#173f43]">{user?.role === "PARENT" ? "Mes enfants" : "Élèves"}</Text>{user?.role !== "PARENT" ? <Pressable className="h-11 w-11 items-center justify-center rounded-2xl bg-[#13786c] active:opacity-70"><MaterialCommunityIcons name="account-plus-outline" size={21} color="white" /></Pressable> : null}</View>
			<View className="mt-5 flex-row items-center rounded-2xl border border-[#dce8e3] bg-white px-4"><MaterialCommunityIcons name="magnify" size={21} color="#78908a" /><TextInput value={query} onChangeText={setQuery} placeholder="Rechercher un élève ou une classe" placeholderTextColor="#9aa9a5" className="ml-2 flex-1 py-4 text-[14px] text-[#173f43]" /></View>
			{loading ? <ActivityIndicator className="mt-5" color="#13786c" /> : null}
			<FlatList data={filteredStudents} keyExtractor={(item) => item.id} contentContainerClassName="pb-8 pt-5" ListEmptyComponent={<Text className="mt-8 text-center text-[14px] text-[#788a86]">Aucun élève trouvé.</Text>} renderItem={({ item }) => (
				<View className="mb-3 rounded-[20px] border border-[#e5ece8] bg-white p-4">
					<View className="flex-row items-center"><View className="h-11 w-11 items-center justify-center rounded-full bg-[#e2f3ee]"><Text className="text-[15px] font-extrabold text-[#13786c]">{item.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</Text></View><View className="ml-3 flex-1"><Text className="text-[15px] font-extrabold text-[#173f43]">{item.name}</Text><Text className="mt-1 text-[12px] text-[#788a86]">Classe {item.className}</Text></View><Text className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${item.status === "Présent" ? "bg-[#e2f3ee] text-[#13786c]" : item.status === "Absent" ? "bg-[#ffe6ed] text-[#c84f61]" : "bg-[#fff0dc] text-[#c56a1b]"}`}>{item.status}</Text></View>
					<View className="mt-4 flex-row border-t border-[#eef2f0] pt-3"><Text className="flex-1 text-[12px] text-[#788a86]">Présence <Text className="font-bold text-[#173f43]">{item.attendance}%</Text></Text><Text className="text-[12px] text-[#788a86]">Moyenne <Text className="font-bold text-[#173f43]">{item.average}/20</Text></Text></View>
				</View>
			)} />
		</View>
	);
}
