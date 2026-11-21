import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SPACE, TYPO } from "../styles/tokens";

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  onPress,
  onToggleFavorite,
}: Props) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.main, pressed && styles.pressed]}
      >
        <View style={styles.moodBox}>
          <Text style={styles.mood}>{mood}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.dateBadge}>
            <Text style={styles.date}>{date}</Text>
          </View>
          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleFavorite}
        hitSlop={6}
        style={({ pressed }) => [
          styles.favoriteButton,
          liked && styles.favoriteButtonActive,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.favorite, liked && styles.favoriteActive]}>
          {liked ? "♥" : "♡"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    marginBottom: SPACE.m,
    paddingRight: SPACE.m,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.m,
    padding: SPACE.l,
  },
  moodBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.accentSoft,
  },
  mood: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
  },
  dateBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.badge,
    marginTop: 5,
    marginBottom: 6,
  },
  date: {
    fontSize: TYPO.caption,
    fontWeight: "600",
    color: COLORS.muted,
  },
  preview: {
    fontSize: TYPO.body,
    lineHeight: 20,
    color: COLORS.secondaryText,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  favoriteButtonActive: {
    backgroundColor: COLORS.dangerSoft,
  },
  favorite: {
    fontSize: 22,
    color: COLORS.muted,
  },
  favoriteActive: {
    color: COLORS.danger,
  },
  pressed: {
    opacity: 0.78,
  },
});