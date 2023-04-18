import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function searchField(obj: any, id: string) {
    for (const item of obj) {
        if (item.id === id) {
            return item;
        }
        if (item.subfields && item.subfields.length > 0) {
            const result: any = searchField(item.subfields, id);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

export function updateFieldValue(fieldId: any, value: any, propertyToBeUpdated: any, formData: any) {
    const updatedFormData = { ...formData };
    const updateField = (fields: any) => {
        if (fields.id === fieldId) {
            fields[propertyToBeUpdated] = value;
        }
        fields.subfields.forEach(updateField);
    };
    updatedFormData.subfields.forEach(updateField);
    return updatedFormData;
}