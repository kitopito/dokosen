import { create } from "zustand";
import { DataBase } from "./DataBase";
import { SearchModelImpl } from "../interface/Search";
import { TeacherInfo } from "./data/TeacherInfo";

export const useTestDataBase = create<DataBase>()((set) => ({
  isLoading: false,
  data: [],
  fetchData: async () => set((state) => ({ data: testData })),
  searchModel: new SearchModelImpl(),
  searchResult: [],
  search: async (keywordInput: string) => {},
}))

const testData: Array<TeacherInfo> = [
  new TeacherInfo(1, '在室', '谷口'),
  new TeacherInfo(2, '講義', '瀬戸山'),
  new TeacherInfo(3, '在室', '新田'),
  new TeacherInfo(4, '帰宅', '小原'),
  new TeacherInfo(5, '講義', '田中'),
  new TeacherInfo(6, '出張', '山田'),
  new TeacherInfo(7, '在室', '岡田'),
  new TeacherInfo(8, '帰宅', '鈴木'),
  new TeacherInfo(9, '講義', '高橋'),
  new TeacherInfo(10, '出張', '佐藤'),
  new TeacherInfo(11, '在室', '伊藤'),
  new TeacherInfo(12, '帰宅', '渡辺'),
];
