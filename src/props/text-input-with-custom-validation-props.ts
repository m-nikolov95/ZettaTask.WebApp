import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { DynamicFormComponentState } from '../state/dynamic-form-component-state';

export interface TextInputWithCustomValidationProps {
    fieldName: string;
    fieldLabel: string;
    required: boolean;
    register: UseFormRegister<DynamicFormComponentState>;
    errors: FieldErrors<DynamicFormComponentState>;
    validation: {
        minLength: number;
        maxLength: number;
        pattern?: string;
    };
    onChange: (value: string) => void;
}