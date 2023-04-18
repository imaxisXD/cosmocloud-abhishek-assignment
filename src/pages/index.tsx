import FormField from '@/Components/FormField';
import { useState } from 'react';
import intailData from '../utils/formData/formData';
import { IntailDataType } from '../utils/formData/formDataTypes';
import { v4 as uuidv4 } from 'uuid';
import { searchField } from '@/utils/lib/utils';


export default function Home() {
  const [formData, setFormData] = useState(intailData);

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
      const parentIndex = updatedFields.findIndex(
        (field) => field.id === field.id
      );
      // Deep search helper function in util
      if (parentIndex === -1) {
        const parentField = searchField(updatedFields, field.id);
        if (parentField) {
          parentField.subfields.push(newSubfield);
        }
        else throw new Error("ERROR IN FINDING PARENT OBJECT");
      }
      else {
        updatedFields[parentIndex].subfields.push(newSubfield);
      }
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
  return (
    <main className='fixed inset-0 flex items-center justify-center bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800'>

      <div className='bg-slate-200 w-10/12 p-4 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 absolute border border-white rounded-lg'>
        <div className='block'>
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
