import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import DiaryCard from "../../src/components/DiaryCard";
import ScreenBackground from "../../src/components/ScreenBackground";
import { toggleFavorite } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) =>
    state.diary.entries.filter((item) => item.liked)
  );
  const backgroundImage = useAppSelector(
    (state) => state.diary.backgroundImage
  );

  return (
    <ScreenBackground backgroundImage={backgroundImage}>
      <View style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.heroBanner}>
            <View>
              <Text style={styles.header}>Diary Favorit</Text>
              <Text style={styles.subtitle}>
                Catatan pilihan yang kamu sukai
              </Text>
            </View>
            <View style={styles.counterBadge}>
              <Text style={styles.counter}>{favorites.length} favorit</Text>
            </View>
          </View>

          <FlatList
            data={favorites}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>♡</Text>
                <Text style={styles.emptyTitle}>Belum ada diary favorit</Text>
                <Text style={styles.emptyText}>
                  Tekan ikon hati pada kartu diary untuk menyimpannya di sini.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <DiaryCard
                title={item.title}
                date={item.date}
                preview={item.preview}
                mood={item.mood}
                liked={item.liked}
                onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
                onPress={() =>
                  router.push({
                    pathname: "/detail/[id]",
                    params: { id: String(item.id) },
                  })
                }
              />
            )}
          />
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
  },
  inner: {
    flex: 1,
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
  },
  heroBanner: {
    backgroundColor: COLORS.headerBg,
    borderRadius: RADIUS.card,
    padding: SPACE.l,
    marginBottom: SPACE.l,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACE.m,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: TYPO.caption,
    color: "#C7D2FE",
    marginTop: 2,
  },
  counterBadge: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
  },
  counter: {
    fontSize: TYPO.caption,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: SPACE.xl,
    flexGrow: 1,
  },
  emptyBox: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.xl,
    alignItems: "center",
    marginTop: SPACE.m,
  },
  emptyIcon: {
    fontSize: 32,
    color: COLORS.danger,
    marginBottom: SPACE.s,
  },
  emptyTitle: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 20,
  },
});