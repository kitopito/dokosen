import { create } from 'zustand'
import { TeacherInfo, TeacherInfo_firebase, TeacherInfo_supabase } from './data/TeacherInfo.ts'
import { supabase } from '../supabase.ts';
import { DataBase } from './DataBase.ts'
import { SearchModelImpl } from '../interface/Search.ts';
import { collection, getDocs } from 'firebase/firestore/lite';
import { firebaseDB } from '../firebase.ts';

export const useTestDataBase = create<DataBase>()((set) => ({
  isLoading: false,
  data: [],
  fetchData: async () => set((state) => ({ data: testData })),
  searchModel: new SearchModelImpl(),
  searchResult: [],
  search: async (keywordInput: string) => {},
}))

export const useSupaBase = create<DataBase>()((set) => ({
  isLoading: false,
  data: [],
  fetchData: async () => {
    set((state) => {
      console.log(state.isLoading);
      return { isLoading: true };
    });

    const fetchedData = 
      (await supabase.from('teacher_info').select('*').order('id'))
      .data as Array<TeacherInfo_supabase>;

    console.log('hoge');
    const transformedData = fetchedData.map((item) => toTeacherInfoS(item));

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

export const useFirebase = create<DataBase>()((set) => ({
  isLoading: false,
  data: [],
  fetchData: async () => {
    set((state) => {
      console.log(state.isLoading);
      return { isLoading: true };
    });

    const citiesCol = collection(firebaseDB, 'teachers');
    
    const fetchedData = (await getDocs(citiesCol))
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
  
function toTeacherInfoS(data: TeacherInfo_supabase): TeacherInfo {
  const teacher_info: TeacherInfo = new TeacherInfo(
    data.id,
    data.status,
    data.teachers_name,
  );
  return teacher_info;
}
  
function toTeacherInfoF(data: TeacherInfo_firebase): TeacherInfo {
  const teacher_info: TeacherInfo = new TeacherInfo(
    data.id,
    data.status,
    data.name,
  );
  return teacher_info;
}


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