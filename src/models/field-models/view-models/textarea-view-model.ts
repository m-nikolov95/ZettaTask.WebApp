import { FieldBaseModel } from '../base-models/field-base-model';

import { FieldType } from '../../../enums/field-type';

export interface TextareaFieldViewModel extends FieldBaseModel {
    type: FieldType.Textarea;
    rows: number;
}