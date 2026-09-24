import { ScrollView, Text } from "react-native";
import { ActivityRow } from "@/components/dashboard/ActivityRow";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { Panel } from "@/components/ui/Panel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { activities, dashboardStats, demoUser, quickActions } from "@/data/dashboard";
import { useAuth } from "@/context/AuthContext";
import { ROLE_HIGHLIGHTS, ROLE_LABELS } from "@/constants/permissions";

export default function DashboardScreen() {
	const { user } = useAuth();
	const firstName = user?.firstName ?? demoUser.firstName;
	const schoolName = user?.schoolName ?? demoUser.schoolName;
	return (
		<ScrollView className="flex-1 bg-[#f7faf8]" contentContainerClassName="px-5 pb-8 pt-14">
			<Text className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#78908a]">Tableau de bord</Text>
			<Text className="mt-2 text-[28px] font-extrabold text-[#173f43]">Bonjour, {firstName}</Text>
			<Text className="mt-1 text-[14px] text-[#788a86]">{schoolName} · activité récente</Text>
			{user ? <Panel className="mt-5 bg-[#173f43]"><Text className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#a8d8ce]">Espace {ROLE_LABELS[user.role]}</Text><Text className="mt-2 text-[14px] leading-5 text-white">{ROLE_HIGHLIGHTS[user.role]}</Text></Panel> : null}

			<SectionHeader title="Vue d'ensemble" />
			<ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mr-5">
				{dashboardStats.map((stat) => <MetricCard key={stat.label} stat={stat} />)}
			</ScrollView>

			<SectionHeader title="Actions rapides" />
			<ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mr-5">
				{quickActions.map((action) => <QuickActionCard key={action.label} action={action} />)}
			</ScrollView>

			<SectionHeader title="Activité récente" action="Tout voir" />
			<Panel>
				{activities.map((activity) => <ActivityRow key={activity.id} activity={activity} />)}
			</Panel>
		</ScrollView>
	);
}
