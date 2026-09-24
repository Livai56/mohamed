import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const { user, isLoading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isLoading && user) return <Redirect href="/(tabs)/dashboard" />;

  async function handleSubmit() {
    if (!email.trim() || !password) return setError("Renseignez votre adresse e-mail et votre mot de passe.");
    setError("");
    setSubmitting(true);
    try { await signIn({ email: email.trim(), password }); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Connexion impossible."); }
    finally { setSubmitting(false); }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1 bg-[#f7faf8]">
      <View className="flex-1 justify-center px-6">
        <View className="mb-10 h-16 w-16 items-center justify-center rounded-[22px] bg-[#13786c]"><MaterialCommunityIcons name="school-outline" size={34} color="white" /></View>
        <Text className="text-[14px] font-bold uppercase tracking-[1.5px] text-[#78908a]">Taslim École</Text>
        <Text className="mt-2 text-[32px] font-extrabold text-[#173f43]">Bienvenue.</Text>
        <Text className="mt-2 text-[15px] leading-6 text-[#788a86]">Suivez la vie de votre établissement depuis un seul espace.</Text>
        <View className="mt-9 gap-4">
          <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="Adresse e-mail" placeholderTextColor="#9aa9a5" className="rounded-2xl border border-[#dce8e3] bg-white px-4 py-4 text-[15px] text-[#173f43]" />
          <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Mot de passe" placeholderTextColor="#9aa9a5" className="rounded-2xl border border-[#dce8e3] bg-white px-4 py-4 text-[15px] text-[#173f43]" />
        </View>
        {error ? <Text className="mt-3 text-[13px] font-semibold text-[#c84f61]">{error}</Text> : null}
        <Pressable onPress={handleSubmit} disabled={submitting} className="mt-6 items-center rounded-2xl bg-[#13786c] py-4 active:opacity-80">
          {submitting ? <ActivityIndicator color="white" /> : <Text className="text-[15px] font-extrabold text-white">Se connecter</Text>}
        </Pressable>
        <Link href="/forgot-password" className="mt-6 text-center text-[13px] font-bold text-[#13786c]">Mot de passe oublié ?</Link>
      </View>
    </KeyboardAvoidingView>
  );
}