import { create } from "zustand";
import { DataBase } from "./DataBase";
import { TeacherInfo, TeacherInfo_d1 } from "./data/TeacherInfo";
import { SearchModelImpl } from "../interface/Search";


const workerURL = "https://dokosen-worker.kitopitowada.workers.dev/teachers";
//const workerURL = "http://127.0.0.1:8787/teachers";
export const useD1 = create<DataBase>()((set) => ({
  isLoading: false,
  data: [],
  fetchData: async () => {
    set((state) => {
      console.log(state.isLoading);
      return { isLoading: true };
    });

    const res = await fetch(workerURL);

    const timer = setInterval(async () => {
			console.log("Interval");
			const fetchedData = await (
        await fetch(workerURL)
      ).json() as Array<TeacherInfo_d1>;
			const transformedData = fetchedData.map((item) => toTeacherInfoD(item));
//			console.log(transformedData);
			set((state) => ({ data: transformedData }));
			set((state) => ({
        searchResult: state.searchModel.searchWithPreviousKeyword(transformedData)
      }));
    }, 10000);
    
    const fetchedData = await res.json() as Array<TeacherInfo_d1>;
    console.log(fetchedData);
    console.log('D1');
    const transformedData = fetchedData.map((item) => toTeacherInfoD(item));

    set((state) => ({ data: transformedData }));
    set((state) => ({ searchResult: state.data}));
    set((state) => ({ isLoading: false }));
  },

  searchModel: new SearchModelImpl(),
  searchResult: [],
  search: async (keywordInput: string) => {
    set((state) => ({ isLoading: true }));
    set((state) => {
      state.searchModel.search(keywordInput, state.data);
      return { searchResult: state.searchModel.searchResult };
    });
    set((state) => ({ isLoading: false }));
  },
}))
  
function toTeacherInfoD(data: TeacherInfo_d1): TeacherInfo {
  const teacher_info: TeacherInfo = new TeacherInfo(
    data.id,
    data.status,
    data.name,
  );
  return teacher_info;
}
