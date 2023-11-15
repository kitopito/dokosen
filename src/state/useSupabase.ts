import { create } from 'zustand'
import { TeacherInfo, TeacherInfo_firebase, TeacherInfo_supabase } from './data/TeacherInfo.ts'
import { supabase } from '../supabase.ts';
import { DataBase } from './DataBase.ts'
import { SearchModelImpl } from '../interface/Search.ts';

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

function toTeacherInfoS(data: TeacherInfo_supabase): TeacherInfo {
  const teacher_info: TeacherInfo = new TeacherInfo(
    data.id,
    data.status,
    data.teachers_name,
  );
  return teacher_info;
}