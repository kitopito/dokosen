import { SearchModelImpl } from '../interface/Search.ts';
import { useSupaBase } from './useSupabase.ts';
import { TeacherInfo } from './data/TeacherInfo.ts'
import { useFirebase } from './useFirebase.ts';
import { useD1 } from './useD1.ts';

export interface DataBase {
    isLoading: boolean;
    data: Array<TeacherInfo>;
    fetchData: () => void;
    
    searchModel: SearchModelImpl<TeacherInfo>;
    searchResult: Array<TeacherInfo>;
    search: (keywordInput: string) => void;
}

export const useDataBase = useD1;