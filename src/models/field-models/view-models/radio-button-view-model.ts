import { FieldType } from '../../../enums/field-type';

import { FieldBaseModel } from '../base-models/field-base-model';

export interface RadioFieldViewModel extends FieldBaseModel {
    type: FieldType.Radio;
    options: { key: string; value: string }[];
}