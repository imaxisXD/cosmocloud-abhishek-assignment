
export type IntailDataType = {
    id: string;
    fieldname: string;
    isObjectOrArray: boolean;
    required: boolean;
    subfields: IntailDataType[];
    type: string;
    [key: string]: any;
};
