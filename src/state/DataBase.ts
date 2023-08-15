import { create } from 'zustand'
import { TeacherInfo, TeacherInfo_supabase } from './data/TeacherInfo.ts'
import { supabase } from '../supabase.ts';

interface DataBase {
    data: Array<TeacherInfo>;
    fetchData: () => void;
}

const useTestDataBase = create<DataBase>()((set) => ({
  data: [],
  fetchData: async () => set((state) => ({ data: testData })),
}))

const useSupaBase = create<DataBase>()((set) => ({
  data: [],
  fetchData: async () => {
    const fetchedData = 
      (await supabase.from('teacher_info').select('*').order('id'))
      .data as Array<TeacherInfo_supabase>;
    console.log('hoge');
    const transformedData = fetchedData.map((item) => toTeacherInfo(item));
    set((state) => ({ data: transformedData }));
  },
}))

export const useDataBase = useSupaBase;
  
function toTeacherInfo(data: TeacherInfo_supabase): TeacherInfo {
  const teacher_info: TeacherInfo = {
    id: data.id,
    status: data.status,
    TeachersName: data.teachers_name,
  };
  return teacher_info;
}
const testData: Array<TeacherInfo> = [
  {
    id: 1,
    status: '在室', 
    TeachersName: '谷口'
  },
  {
    id: 2,
    status: '講義', 
    TeachersName: '瀬戸山'
  },
  {
    id: 3,
    status: '在室', 
    TeachersName: '新田'
  },
  {
    id: 4,
    status: '帰宅', 
    TeachersName: '小原'
  },
  {
    id: 5,
    status: '講義', 
    TeachersName: '田中'
  },
  {
    id: 6,
    status: '出張', 
    TeachersName: '山田'
  },
  {
    id: 7,
    status: '在室', 
    TeachersName: '岡田'
  },
  {
    id: 8,
    status: '帰宅', 
    TeachersName: '鈴木'
  },
  {
    id: 9,
    status: '講義', 
    TeachersName: '高橋'
  },
  {
    id: 10,
    status: '出張', 
    TeachersName: '佐藤'
  },
  {
    id: 11,
    status: '在室', 
    TeachersName: '伊藤'
  },
  {
    id: 12,
    status: '帰宅', 
    TeachersName: '渡辺'
  },
];