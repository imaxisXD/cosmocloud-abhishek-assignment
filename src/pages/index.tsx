import FormField from '@/Components/FormField';
import { useState } from 'react';
import intailData from '../utils/formData/formData';
import { IntailDataType } from '../utils/formData/formDataTypes';
import { v4 as uuidv4 } from 'uuid';
import { searchField } from '@/utils/lib/utils';
import Link from 'next/link';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoMdAddCircleOutline } from 'react-icons/io'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  AlertDialog,
  AlertDialogAction,

  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../Components/ui/alert";



export default function Home() {
  const [formData, setFormData] = useState(intailData);
  const [parent] = useAutoAnimate();
  function updateFieldValue(fieldId: string, value: string | boolean, property: keyof IntailDataType) {
    const updatedFormData = { ...formData };
    const updateField = (fields: IntailDataType) => {
      if (fields.id === fieldId) {
        fields[property] = value;
      }
      fields.subfields.forEach(updateField);
    };
    updatedFormData.subfields.forEach(updateField);
    setFormData(updatedFormData);
  }

  function addSubfield(field: IntailDataType, fieldname: string, type: string, required: boolean, isObjectOrArray: boolean) {
    let myuuid = uuidv4();
    const newSubfield = {
      id: myuuid,
      fieldname: fieldname,
      type: type,
      required: required,
      isObjectOrArray: isObjectOrArray,
      subfields: [],
    };
    setFormData((prev) => {
      const updatedFields = [...prev.subfields];
      const parentField = searchField(updatedFields, field.id);
      console.log(parentField);
      if (parentField) {
        parentField.subfields.push(newSubfield);
      }
      else throw new Error("ERROR IN FINDING PARENT OBJECT");
      return { ...prev, subfields: updatedFields };
    });
  }

  function removeField(fieldId: string) {
    const updatedFormData = { ...formData };
    const removeSubfield = (subfields: IntailDataType[]) => {
      for (let i = 0; i < subfields.length; i++) {
        const subfield = subfields[i];
        if (subfield.id === fieldId) {
          subfields.splice(i, 1);
          return true;
        } else if (subfield.subfields && subfield.subfields.length > 0) {
          if (removeSubfield(subfield.subfields)) {
            return true;
          }
        }
      }
      return false;
    };
    removeSubfield(updatedFormData.subfields);
    setFormData(updatedFormData);
  }
  function handleClick() {
    console.log(`🔧 The formData Looks like this the new fields are added to subfield of the parent object 🔧`);
    console.log(formData);

  }
  function handleAddClick() {
    let myuuid = uuidv4();
    const newSubfield = {
      id: myuuid,
      fieldname: "addName",
      type: "string",
      required: false,
      isObjectOrArray: false,
      subfields: [],
    };
    setFormData((prev) => {
      const updatedFields = [...prev.subfields];
      updatedFields.push(newSubfield);
      return { ...prev, subfields: updatedFields };
    });
  }
  function handleDeleteClick() {
    setFormData((prev) => {
      let updatedFields = [...prev.subfields];
      updatedFields = []
      return { ...prev, subfields: updatedFields };
    });

  }
  return (
    <main className='fixed inset-0 flex items-center justify-center bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800'>
      <div className='bg-slate-200 w-10/12 p-4 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 absolute border border-white rounded-lg' >
        <div className='flex justify-between'>
          <div>
            <button onClick={handleAddClick} className='p-2 ml-1 mr-3 cursor-pointer border bg-green-300 hover:bg-green-300/60 rounded-full'>< IoMdAddCircleOutline /></button>
            <button className='p-2 mr-3 cursor-pointer border bg-red-400 hover:bg-white/60 rounded-full' onClick={handleDeleteClick}>< RiDeleteBinLine /></button>
            <span className='text-white'>{formData.fieldname}</span>
          </div>
          <div className='inline'>
            <AlertDialog>
              <AlertDialogTrigger className='border-solid border-2 border-sky-500relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'><span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Save Form
              </span></AlertDialogTrigger>
              <AlertDialogContent className='text-white' >
                <AlertDialogHeader>
                  <AlertDialogTitle>Please See The Console For The Schema</AlertDialogTitle>
                  <AlertDialogDescription >
                    Made by a kickass developer <strong className='text-white'>Abhishek 🫶🏻 </strong>
                    <Link href="https://github.com/imaxisXD/cosmocloud-abhishek-assignment">
                      - Github 🚀
                    </Link>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={handleClick}>Open the console</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className='block' ref={parent} >
          {formData.subfields.map((fields) => {
            return (
              <FormField key={fields.id} fields={fields} updateFieldValue={updateFieldValue} addSubfield={addSubfield} removeField={removeField} />
            )
          })}
        </div>
      </div>
    </main>
  )
}
