import { FieldBaseModel } from '../base-models/field-base-model';

import { FieldType } from '../../../enums/field-type';

export interface TextWithValidationViewModel extends FieldBaseModel {
    type: FieldType.TextWithValidation;
    validation?: {
        minLength?: number;
        maxLength?: number;
        pattern?: string;
    };
}