import { ReactNode } from "react";
import { Image, StyleSheet, View } from "react-native";
import { COLORS } from "../styles/tokens";

type Props = {
  backgroundImage: string | null;
  children: ReactNode;
};

export default function ScreenBackground({ backgroundImage, children }: Props) {
  return (
    <View style={styles.root}>
      {backgroundImage ? (
        <View style={styles.bgLayer} pointerEvents="none">
          <Image
            source={{ uri: backgroundImage }}
            style={styles.bgImage}
            resizeMode="contain"
          />
          <View style={styles.scrim} />
        </View>
      ) : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: "relative",
  },
  bgLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#1E1B4B",
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.28)",
  },
  content: {
    flex: 1,
  },
});