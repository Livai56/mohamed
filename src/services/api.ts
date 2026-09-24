import type { AuthUserResponse, User, UserRole } from "@/types/auth";
import type { Message, Student } from "@/types/school";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type LoginPayload = { email: string; password: string };
export type PasswordResetPayload = { email: string };

export type ApiError = Error & { status?: number };

function normalizeRole(role?: string): UserRole {
	const normalized = role?.toUpperCase();
	if (normalized === "ADMIN" || normalized === "DIRECTEUR" || normalized === "DIRECTOR") return "ADMIN";
	if (normalized === "ENSEIGNANT" || normalized === "TEACHER") return "ENSEIGNANT";
	return "PARENT";
}

function normalizeUser(user: AuthUserResponse): User {
	return {
		id: Number(user.id ?? 0),
		firstName: user.firstName ?? user.first_name ?? "Utilisateur",
		lastName: user.lastName ?? user.last_name ?? "",
		email: user.email ?? "",
		role: normalizeRole(user.role),
		schoolName: user.schoolName ?? user.school_name ?? "Mon établissement",
		avatarUrl: user.avatarUrl,
	};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
	const response = await fetch(`${API_URL}${path}`, {
		...options,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	if (!response.ok) {
		let message = `Erreur serveur (${response.status})`;
		try {
			const body = await response.json() as { detail?: string; message?: string };
			message = body.detail ?? body.message ?? message;
		} catch {
		}
		const error = new Error(message) as ApiError;
		error.status = response.status;
		throw error;
	}

	return response.json() as Promise<T>;
}

export const schoolApi = {
	login: async (payload: LoginPayload) => {
		const response = await request<{ user: AuthUserResponse; token?: string; access?: string; refresh?: string }>("/auth/login/", {
		method: "POST",
		body: JSON.stringify(payload),
		});
		return { ...response, user: normalizeUser(response.user) };
	},
	requestPasswordReset: (payload: PasswordResetPayload) => request<{ detail?: string }>("/auth/password-reset/", {
		method: "POST",
		body: JSON.stringify(payload),
	}),
	getStudents: (token: string) => request<Student[]>("/students/", {
		headers: { Authorization: `Bearer ${token}` },
	}),
	getChildren: (token: string) => request<Student[]>("/children/", {
		headers: { Authorization: `Bearer ${token}` },
	}),
	getMessages: (token: string) => request<Message[]>("/messages/", {
		headers: { Authorization: `Bearer ${token}` },
	}),
};

export { API_URL };
