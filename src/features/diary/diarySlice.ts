import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DiaryEntry = {
  id: number;
  title: string;
  date: string;
  preview: string;
  body: string;
  mood: string;
  liked: boolean;
};

type DiaryState = {
  entries: DiaryEntry[];
  backgroundImage: string | null;
};

const initialState: DiaryState = {
  entries: [
    {
      id: 1,
      title: "Pagi yang Tenang",
      date: "2026-11-15",
      preview: "Jalan pagi sebelum memulai aktivitas.",
      body: "Jalan pagi sebelum memulai aktivitas membuat pikiran jauh lebih segar dan siap menjalani hari.",
      mood: "😊",
      liked: false,
    },
    {
      id: 2,
      title: "Produktif di Kampus",
      date: "2026-11-14",
      preview: "Menyelesaikan modul dan berdiskusi dengan tim.",
      body: "Menyelesaikan modul praktikum React Native dan berdiskusi dengan tim mengenai struktur state Redux.",
      mood: "🔥",
      liked: true,
    },
    {
      id: 3,
      title: "Senja dan Buku",
      date: "2026-11-13",
      preview: "Membaca buku sambil menikmati sore.",
      body: "Membaca buku di teras sambil menikmati udara sore yang sejuk.",
      mood: "📖",
      liked: false,
    },
  ],
  backgroundImage: null,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    addDiary: (
      state,
      action: PayloadAction<Omit<DiaryEntry, "id" | "liked">>
    ) => {
      const nextId =
        state.entries.length > 0
          ? Math.max(...state.entries.map((item) => item.id)) + 1
          : 1;
      state.entries.unshift({
        id: nextId,
        liked: false,
        ...action.payload,
      });
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const target = state.entries.find((item) => item.id === action.payload);
      if (target) {
        target.liked = !target.liked;
      }
    },
    deleteDiary: (state, action: PayloadAction<number>) => {
      state.entries = state.entries.filter(
        (item) => item.id !== action.payload
      );
    },
    setBackgroundImage: (state, action: PayloadAction<string | null>) => {
      state.backgroundImage = action.payload;
    },
  },
});

export const { addDiary, toggleFavorite, deleteDiary, setBackgroundImage } =
  diarySlice.actions;

export default diarySlice.reducer;