import { create } from "zustand";
import { DataBase } from "./DataBase";
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { firebaseDB } from "../firebase";
import { TeacherInfo, TeacherInfo_firebase } from "./data/TeacherInfo";
import { SearchModelImpl } from "../interface/Search";


export const useFirebase = create<DataBase>()((set) => ({
  isLoading: false,
  data: [],
  fetchData: async () => {
    set((state) => {
      console.log(state.isLoading);
      return { isLoading: true };
    });

    const teachersCol = collection(firebaseDB, 'teachers');
		onSnapshot(teachersCol, (snapshot) => {
			console.log("onSnapshot");
			const fetchedData = snapshot
				.docs.map((doc) => doc.data()) as Array<TeacherInfo_firebase>;
			const transformedData = fetchedData.map((item) => toTeacherInfoF(item));
			console.log(transformedData);
			set((state) => ({ data: transformedData }));
			set((state) => ({ searchResult: state.data}));
    });
    
    const fetchedData = (await getDocs(teachersCol))
      .docs.map(doc => doc.data()) as Array<TeacherInfo_firebase>;

    console.log(fetchedData);
    console.log('firebase');
    const transformedData = fetchedData.map((item) => toTeacherInfoF(item));

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
  
function toTeacherInfoF(data: TeacherInfo_firebase): TeacherInfo {
  const teacher_info: TeacherInfo = new TeacherInfo(
    data.id,
    data.status,
    data.name,
  );
  return teacher_info;
}
