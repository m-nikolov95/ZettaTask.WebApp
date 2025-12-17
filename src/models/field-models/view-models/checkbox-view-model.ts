import { FieldType } from '../../../enums/field-type';

import { FieldBaseModel } from '../base-models/field-base-model';

export interface CheckboxFieldViewModel extends FieldBaseModel {
    type: FieldType.Checkbox;
}