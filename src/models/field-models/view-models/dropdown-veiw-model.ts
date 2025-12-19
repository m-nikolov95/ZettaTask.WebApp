import { FieldBaseModel } from '../base-models/field-base-model';

import { FieldType } from '../../../enums/field-type';

export interface DropdownViewModel extends FieldBaseModel {
    type: FieldType.Dropdown;
    options: { key: string; value: string }[];
}