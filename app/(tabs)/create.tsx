import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../../src/store/hooks";
import { addDiary } from "../../src/features/diary/diarySlice";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ["😊", "🔥", "📖"];

export default function CreateScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("😊");
  const [focusedField, setFocusedField] = useState<"title" | "body" | null>(
    null
  );

  const saveDiary = () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Validasi", "Judul dan isi wajib diisi");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    dispatch(
      addDiary({
        title: title.trim(),
        date: today,
        preview: body.trim().slice(0, 100),
        body: body.trim(),
        mood,
      })
    );

    setTitle("");
    setBody("");
    setMood("😊");
    router.replace("/(tabs)");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.inner}>
        <Text style={styles.heading}>Tambah Diary</Text>
        <Text style={styles.subtitle}>
          Tulis cerita singkat atau catatan penting hari ini
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Judul</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            onFocus={() => setFocusedField("title")}
            onBlur={() => setFocusedField(null)}
            placeholder="Contoh: Ngopi sore sambil ngoding"
            placeholderTextColor={COLORS.muted}
            style={[
              styles.input,
              focusedField === "title" && styles.inputFocused,
            ]}
          />

          <Text style={styles.label}>Isi Catatan</Text>
          <TextInput
            value={body}
            onChangeText={setBody}
            onFocus={() => setFocusedField("body")}
            onBlur={() => setFocusedField(null)}
            placeholder="Ceritakan harimu..."
            placeholderTextColor={COLORS.muted}
            multiline
            style={[
              styles.input,
              styles.bodyInput,
              focusedField === "body" && styles.inputFocused,
            ]}
          />

          <Text style={styles.label}>Pilih Mood</Text>
          <View style={styles.moodRow}>
            {MOODS.map((item) => {
              const isSelected = mood === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setMood(item)}
                  style={({ pressed }) => [
                    styles.moodButton,
                    isSelected && styles.selectedMood,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.mood}>{item}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          onPress={saveDiary}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Simpan ke Redux</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACE.l,
    paddingBottom: SPACE.xl,
  },
  inner: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
  },
  heading: {
    fontSize: TYPO.h1,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 2,
    marginBottom: SPACE.l,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.l,
    marginBottom: SPACE.l,
  },
  label: {
    fontSize: TYPO.caption,
    fontWeight: "700",
    color: COLORS.secondaryText,
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACE.m,
    fontSize: TYPO.body,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    marginBottom: SPACE.m,
  },
  inputFocused: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.surface,
  },
  bodyInput: {
    minHeight: 140,
    textAlignVertical: "top",
  },
  moodRow: {
    flexDirection: "row",
    gap: SPACE.m,
    marginTop: 2,
  },
  moodButton: {
    width: 62,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    backgroundColor: COLORS.background,
  },
  selectedMood: {
    borderColor: COLORS.accent,
    borderWidth: 2,
    backgroundColor: COLORS.surfaceSoft,
  },
  mood: {
    fontSize: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: SPACE.l,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  pressed: {
    opacity: 0.82,
  },
});