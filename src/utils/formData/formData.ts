import { IntailDataType } from './formDataTypes';

const intailData: IntailDataType = {
    id: "0",
    fieldname: "Field name and type",
    isObjectOrArray: true,
    type: "obj",
    required: true,
    subfields: [
        {
            id: "1",
            fieldname: "person",
            isObjectOrArray: true,
            type: "obj",
            required: true,
            subfields: [
                {
                    id: "1.1",
                    fieldname: "name",
                    isObjectOrArray: true,
                    type: "obj",
                    required: true,
                    subfields: [
                        {
                            id: "1.1.1",
                            fieldname: "firstName",
                            isObjectOrArray: false,
                            type: "string",
                            required: true,
                            subfields: []

                        },
                        {
                            id: "1.1.2",
                            fieldname: "lastName",
                            isObjectOrArray: false,
                            type: "string",
                            required: true,
                            subfields: []
                        }
                    ]
                },
                {
                    id: "1.2",
                    fieldname: "age",
                    isObjectOrArray: false,
                    type: "number",
                    required: true,
                    subfields: []
                }
            ]
        },
        {
            id: '2',
            fieldname: 'order',
            isObjectOrArray: false,
            type: "arr",
            required: true,
            subfields: []
        },
        {
            id: '3',
            fieldname: 'class',
            isObjectOrArray: false,
            type: "boolean",
            required: true,
            subfields: []
        }


    ],


};

export default intailData;