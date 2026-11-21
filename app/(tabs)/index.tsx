import { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import DiaryCard from "../../src/components/DiaryCard";
import ScreenBackground from "../../src/components/ScreenBackground";
import {
  setBackgroundImage,
  toggleFavorite,
} from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const entries = useAppSelector((state) => state.diary.entries);
  const backgroundImage = useAppSelector(
    (state) => state.diary.backgroundImage
  );

  const [showBgPanel, setShowBgPanel] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const favoriteCount = entries.filter((item) => item.liked).length;

  const handlePickWebFile = () => {
    if (Platform.OS !== "web") return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          dispatch(setBackgroundImage(reader.result));
          setShowBgPanel(false);
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const applyUrlBackground = () => {
    if (!urlInput.trim()) return;
    dispatch(setBackgroundImage(urlInput.trim()));
    setUrlInput("");
    setShowBgPanel(false);
  };

  return (
    <ScreenBackground backgroundImage={backgroundImage}>
      <View style={styles.container}>
        <View style={styles.inner}>
          {/* Header Banner */}
          <View style={styles.heroBanner}>
            <View style={styles.heroTop}>
              <View>
                <Text style={styles.header}>Buku Harian</Text>
                <Text style={styles.subtitle}>
                  Catatan momen & aktivitas harianmu
                </Text>
              </View>

              <Pressable
                onPress={() => setShowBgPanel((prev) => !prev)}
                style={({ pressed }) => [
                  styles.bgButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.bgButtonText}>
                  {showBgPanel ? "Tutup" : "Ganti Background"}
                </Text>
              </Pressable>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statPill}>
                <Text style={styles.statText}>{entries.length} Total Diary</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statText}>{favoriteCount} Favorit</Text>
              </View>
            </View>

            {showBgPanel ? (
              <View style={styles.bgPanel}>
                <Text style={styles.bgPanelTitle}>
                  Atur Gambar Background (Tampil Utuh)
                </Text>

                <View style={styles.bgActionRow}>
                  {Platform.OS === "web" ? (
                    <Pressable
                      onPress={handlePickWebFile}
                      style={({ pressed }) => [
                        styles.pickFileBtn,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={styles.pickFileBtnText}>
                        Pilih Foto dari Perangkat
                      </Text>
                    </Pressable>
                  ) : null}

                  {backgroundImage ? (
                    <Pressable
                      onPress={() => {
                        dispatch(setBackgroundImage(null));
                        setShowBgPanel(false);
                      }}
                      style={({ pressed }) => [
                        styles.resetBtn,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={styles.resetBtnText}>Hapus Background</Text>
                    </Pressable>
                  ) : null}
                </View>

                <View style={styles.urlRow}>
                  <TextInput
                    value={urlInput}
                    onChangeText={setUrlInput}
                    placeholder="Atau tempel URL gambar (https://...)"
                    placeholderTextColor={COLORS.muted}
                    style={styles.urlInput}
                  />
                  <Pressable
                    onPress={applyUrlBackground}
                    style={({ pressed }) => [
                      styles.applyUrlBtn,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.applyUrlBtnText}>Pasang</Text>
                  </Pressable>
                </View>
              </View>
            ) : null}
          </View>

          <FlatList
            data={entries}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
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
  },
  heroTop: {
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
  bgButton: {
    backgroundColor: COLORS.headerAccent,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.pill,
  },
  bgButtonText: {
    color: "#FFFFFF",
    fontSize: TYPO.caption,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACE.s,
    marginTop: SPACE.m,
  },
  statPill: {
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
  },
  statText: {
    color: "#EEF2FF",
    fontSize: TYPO.caption,
    fontWeight: "600",
  },
  bgPanel: {
    marginTop: SPACE.m,
    paddingTop: SPACE.m,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.18)",
    gap: SPACE.s,
  },
  bgPanelTitle: {
    color: "#E0E7FF",
    fontSize: TYPO.caption,
    fontWeight: "700",
  },
  bgActionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.s,
  },
  pickFileBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  pickFileBtnText: {
    color: COLORS.headerBg,
    fontSize: TYPO.caption,
    fontWeight: "700",
  },
  resetBtn: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  resetBtnText: {
    color: "#FFFFFF",
    fontSize: TYPO.caption,
    fontWeight: "700",
  },
  urlRow: {
    flexDirection: "row",
    gap: SPACE.s,
    marginTop: 2,
  },
  urlInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: TYPO.caption,
    color: COLORS.text,
  },
  applyUrlBtn: {
    backgroundColor: COLORS.headerAccent,
    paddingHorizontal: 14,
    justifyContent: "center",
    borderRadius: 10,
  },
  applyUrlBtnText: {
    color: "#FFFFFF",
    fontSize: TYPO.caption,
    fontWeight: "700",
  },
  listContent: {
    paddingBottom: SPACE.xl,
  },
  pressed: {
    opacity: 0.82,
  },
});