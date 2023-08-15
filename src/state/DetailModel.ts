import { create } from 'zustand'
import { TeacherInfo } from './data/TeacherInfo.ts'

interface DetailModel {
  info: TeacherInfo;
  setInfo: (info: TeacherInfo) => void;
}

const useTestDatailModel = create<DetailModel>()((set) => ({
  info: {} as TeacherInfo,
  setInfo: async (info: TeacherInfo) => set((state) => ({info: info})),
}))

export const useDetailModel = useTestDatailModel;