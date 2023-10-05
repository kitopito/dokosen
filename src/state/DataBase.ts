import { SearchModelImpl } from '../interface/Search.ts';
import { useFirebase, useSupaBase } from './DataBaseImpl.ts';
import { TeacherInfo } from './data/TeacherInfo.ts'

export interface DataBase {
    isLoading: boolean;
    data: Array<TeacherInfo>;
    fetchData: () => void;
    
    searchModel: SearchModelImpl<TeacherInfo>;
    searchResult: Array<TeacherInfo>;
    search: (keywordInput: string) => void;
}

export const useDataBase = useFirebase;