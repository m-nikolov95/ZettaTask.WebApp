import { FieldBaseModel } from '../base-models/field-base-model';

import { FieldType } from '../../../enums/field-type';

export interface TextViewModel extends FieldBaseModel {
    type: FieldType.Text
};