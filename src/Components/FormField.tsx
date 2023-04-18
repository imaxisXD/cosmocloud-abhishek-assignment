import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Switch } from "./ui/react-switch";
import { IntailDataType } from '../utils/formData/formDataTypes';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoMdAddCircleOutline } from 'react-icons/io'
import { useState } from "react";

interface Props {
    fields: IntailDataType;
    addSubfield: (parent: IntailDataType, fieldname: string, type: string, required: boolean, isObjectOrArray: boolean) => void;
    updateFieldValue: (id: string, value: boolean | string, prop: any) => void;
    removeField: (id: string) => void;
}



function FormField({ fields, addSubfield, updateFieldValue, removeField }: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const [newFile, setNewFile] = useState({
        fieldname: "addName",
        type: "number",
        required: false,
        isObjectOrArray: false,
        subfields: []
    })
    console.log('FORMFIELD   ' + fields.id);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    function handleValueChange(value: string) {
        if (value === fields.type) {
            return;
        }
        else if (value === 'obj' || value === 'arr') {
            updateFieldValue(fields.id, value, 'type');
            updateFieldValue(fields.id, true, 'isObjectOrArray');
        }
        else {
            updateFieldValue(fields.id, value, 'type');
            updateFieldValue(fields.id, false, 'isObjectOrArray');
        }
    };
    function handleSwitchChange(value: boolean) {
        updateFieldValue(fields.id, value, 'required');
    }
    function handleAddClick() {
        addSubfield(fields, newFile.fieldname, newFile.type, newFile.required, newFile.isObjectOrArray)
    };
    function handleDeleteClick() {
        removeField(fields.id);
    }


    return (
        <div >
            <div className="flex justify-between pl-2 hover:bg-violet-300 hover:opacity-90 border-b border-white" onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div ><span className="text-black">{fields.fieldname} </span>
                    <span>
                        <div className="inline-flex p-1">
                            <Select value={fields.type} onValueChange={handleValueChange} >
                                <SelectTrigger  >
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="string" >String</SelectItem>
                                    <SelectItem value="boolean">Boolean</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="obj">Object</SelectItem>
                                    <SelectItem value="arr">Array[]</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </span>
                </div>
                {isHovered && <div className="flex justify-between items-center pr-2" >
                    <span className="p-2">
                        <label htmlFor="requiredBTN" >Required</label>
                    </span>
                    <span className="p-2">
                        <Switch id="requiredBTN" defaultChecked={fields.required} onCheckedChange={handleSwitchChange} /></span>
                    <span className="m-2 border-1 border-white cursor-pointer	">
                        <button onClick={handleDeleteClick}>< RiDeleteBinLine /></button>
                    </span>
                    {fields.isObjectOrArray && <span className="ml-3 border-1 border-white cursor-pointer">
                        <button onClick={handleAddClick}>< IoMdAddCircleOutline /></button>
                    </span>}
                </div>}


            </div >
            {fields.subfields.map((subfield) => {
                return (
                    <div className="ml-5 ">
                        <FormField key={subfield.id} fields={subfield} updateFieldValue={updateFieldValue} addSubfield={addSubfield} removeField={removeField} />
                    </div>
                )
            })}

        </div>
    )
}

export default FormField;