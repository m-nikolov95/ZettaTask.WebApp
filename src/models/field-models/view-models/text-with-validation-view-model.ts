import { ValidationRule } from 'react-hook-form';

import { FieldBaseModel } from '../base-models/field-base-model';

import { FieldType } from '../../../enums/field-type';

export interface TextWithValidationViewModel extends FieldBaseModel {
    type: FieldType.TextWithValidation;
    required: boolean;
    validation: {
        minLength: number;
        maxLength: number;
        pattern?: string;
    };
}