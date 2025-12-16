import { FieldTypeModel } from '../field-type-model';

export interface FieldBaseModel {
  type: FieldTypeModel;
  name: string;
  label: string;
}