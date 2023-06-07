interface ITravel {
    departureDate: string;
    immigrationDate: string;
    departure: string;
    destination: string;
};
 
interface ITravelBlockProps {
    values: ITravel[];
    country: object[]
};

interface IForm {
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
    symptoms: string[];
    vaccines: string;
};

interface IProvince {
    [key: string]: {
        name: string;
        cities: {
            [key: string]: string;
        };
    };
};


export type {
    IForm,
    IProvince,
    ITravelBlockProps,
    ITravel
};