import { FieldModel } from '../field-model';

import { FieldType } from '../../../enums/field-type';

export interface GroupFieldViewModel {
    type: FieldType.Group;
    name: string;
    label: string;
    fields: FieldModel[];
    collapsible?: boolean;
    defaultExpanded?: boolean;
}