import { FieldModel } from '../field-model';

import { DependenciesViewModel } from '../../dependencies-models/view-models/dependencies-view-model';

import { FieldType } from '../../../enums/field-type';

export interface GroupFieldViewModel {
    type: FieldType.Group;
    name: string;
    label: string;
    fields: FieldModel[];
    dependencies?: DependenciesViewModel;
}