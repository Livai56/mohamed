import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import { schoolApi } from "@/services/api";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Saisissez une adresse e-mail valide.");
    setError("");
    setSubmitting(true);
    try { await schoolApi.requestPasswordReset({ email: email.trim() }); setSent(true); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "La demande n'a pas pu être envoyée."); }
    finally { setSubmitting(false); }
  }

  return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1 bg-[#f7faf8]"><View className="flex-1 justify-center px-6"><View className="mb-8 h-14 w-14 items-center justify-center rounded-[20px] bg-[#e2f3ee]"><MaterialCommunityIcons name="lock-reset" size={29} color="#13786c" /></View><Text className="text-[30px] font-extrabold text-[#173f43]">Mot de passe oublié ?</Text><Text className="mt-2 text-[15px] leading-6 text-[#788a86]">Recevez un lien sécurisé pour créer un nouveau mot de passe.</Text>{sent ? <View className="mt-8 rounded-2xl border border-[#bde5da] bg-[#e2f3ee] p-4"><Text className="text-[14px] font-bold leading-5 text-[#13786c]">Le lien de réinitialisation a été envoyé si cette adresse correspond à un compte.</Text></View> : <><TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="Adresse e-mail" placeholderTextColor="#9aa9a5" className="mt-8 rounded-2xl border border-[#dce8e3] bg-white px-4 py-4 text-[15px] text-[#173f43]" />{error ? <Text className="mt-3 text-[13px] font-semibold text-[#c84f61]">{error}</Text> : null}<Pressable onPress={handleSubmit} disabled={submitting} className="mt-5 items-center rounded-2xl bg-[#13786c] py-4 active:opacity-80">{submitting ? <ActivityIndicator color="white" /> : <Text className="text-[15px] font-extrabold text-white">Envoyer le lien</Text>}</Pressable></>}<Link href="/login" className="mt-7 text-center text-[14px] font-bold text-[#13786c]">Retour à la connexion</Link></View></KeyboardAvoidingView>;
}