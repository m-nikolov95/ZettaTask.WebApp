import { FieldModel } from '../field-model';
import { FieldBaseModel } from '../base-models/field-base-model';

import { FieldType } from '../../../enums/field-type';

export interface GroupFieldViewModel extends FieldBaseModel {
    type: FieldType.Group;
    fields: FieldModel[];
}