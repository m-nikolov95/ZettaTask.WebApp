import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { TextWithValidationViewModel } from '../models/field-models/view-models/text-with-validation-view-model';

import { DynamicFormComponentState } from '../state/dynamic-form-component-state';

export interface TextWithValidationProps {
    fieldName: string;
    watchFieldValue: string;
    register: UseFormRegister<DynamicFormComponentState>;
    errors: FieldErrors<DynamicFormComponentState>;
    field: TextWithValidationViewModel
    onChange: (value: string) => void;
}