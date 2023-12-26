import { Searchable } from "../../interface/Search";

export class TeacherInfo implements Searchable {
    private _id: number;
    private _status: string;
    private _TeachersName: string;
    
    constructor(id: number, status: string, name: string) {
        this._id = id;
        this._status = status;
        this._TeachersName = name;
    }

    get id() {return this._id;}
    get status() {return this._status;}
    get TeachersName() {return this._TeachersName;}

    get targetSentence(): string {return this.status + this.TeachersName;}
}

export interface TeacherInfo_supabase {
    id: number;
    status: string;
    teachers_name: string;
}

export interface TeacherInfo_firebase {
    id: number;
    name: string;
    status: string;
}

export interface TeacherInfo_d1 {
    id: number;
    name: string;
    status: string;
    updatedAt: number;
}