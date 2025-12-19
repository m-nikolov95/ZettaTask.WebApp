import { DependenciesViewModel } from '../../dependencies-models/view-models/dependencies-view-model';

import { ApiConfigurationBindingModel } from '../binding-models/api-configuration-binding-model';

import { FieldTypeModel } from '../field-type-model';

export interface FieldBaseModel {
    type: FieldTypeModel;
    name: string;
    label: string;
    dependencies?: DependenciesViewModel;
    apiConfiguration?: ApiConfigurationBindingModel;
}