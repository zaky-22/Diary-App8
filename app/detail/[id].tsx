import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import {
  deleteDiary,
  toggleFavorite,
} from "../../src/features/diary/diarySlice";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function DetailScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();

  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === Number(id))
  );

  if (!entry) {
    return (
      <View style={styles.notFoundContainer}>
        <View style={styles.notFoundCard}>
          <Text style={styles.notFoundTitle}>Diary tidak ditemukan.</Text>
          <Pressable
            onPress={() => router.replace("/(tabs)")}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Text style={styles.backButtonText}>Kembali ke Beranda</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const confirmDelete = () => {
    Alert.alert("Hapus Diary", "Diary akan dihapus dari Redux Store.", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          dispatch(deleteDiary(entry.id));
          router.replace("/(tabs)");
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.inner}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backLink, pressed && styles.pressed]}
        >
          <Text style={styles.backLinkText}>← Kembali</Text>
        </Pressable>

        <View style={styles.detailCard}>
          <View style={styles.moodBadge}>
            <Text style={styles.mood}>{entry.mood}</Text>
          </View>

          <Text style={styles.title}>{entry.title}</Text>

          <View style={styles.dateBadge}>
            <Text style={styles.date}>{entry.date}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.body}>{entry.body}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => dispatch(toggleFavorite(entry.id))}
            style={({ pressed }) => [
              styles.favoriteButton,
              entry.liked && styles.favoriteButtonActive,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.white}>
              {entry.liked ? "♥ Hapus dari Favorite" : "♡ Tambah ke Favorite"}
            </Text>
          </Pressable>

          <Pressable
            onPress={confirmDelete}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.white}>Hapus Diary</Text>
          </Pressable>
        </View>
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
    gap: SPACE.m,
  },
  backLink: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backLinkText: {
    fontSize: TYPO.caption,
    fontWeight: "700",
    color: COLORS.secondaryText,
  },
  detailCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.xl,
  },
  moodBadge: {
    width: 76,
    height: 76,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.accentSoft,
    marginBottom: SPACE.l,
  },
  mood: {
    fontSize: 44,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: "800",
    color: COLORS.text,
  },
  dateBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.badge,
    marginTop: SPACE.s,
  },
  date: {
    fontSize: TYPO.caption,
    fontWeight: "600",
    color: COLORS.muted,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACE.l,
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.text,
  },
  actions: {
    gap: SPACE.m,
    marginTop: 4,
  },
  favoriteButton: {
    padding: 15,
    alignItems: "center",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
  },
  favoriteButtonActive: {
    backgroundColor: "#3730A3",
  },
  deleteButton: {
    padding: 15,
    alignItems: "center",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.danger,
  },
  white: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    padding: SPACE.l,
  },
  notFoundCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.xl,
    alignItems: "center",
    gap: SPACE.m,
    maxWidth: 420,
    width: "100%",
    alignSelf: "center",
  },
  notFoundTitle: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.82,
  },
});