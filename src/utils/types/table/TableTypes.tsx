import { ITravel } from "../form/FormTypes"

interface ITableRow {
    id: string;
    fullName: string;
    object: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    nationId: string;
    travels: ITravel[];
    province: string;
    district: string;
    address: string;
    email: string;
    mobile: string;
    symptoms: [];
    vaccines: string;
};


export type {
    ITableRow,
    
};