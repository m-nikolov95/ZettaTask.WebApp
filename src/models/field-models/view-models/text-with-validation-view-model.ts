import { FieldBaseModel } from '../base-models/field-base-model';

import { RuleStructureModel } from '../../validation-models/rule-structure-model';
import { ValidationRulesModel } from '../../validation-models/validation-rules-model';

import { FieldType } from '../../../enums/field-type';

export interface TextWithValidationViewModel extends FieldBaseModel {
    type: FieldType.TextWithValidation;
    required: boolean;
    validation?: RuleStructureModel;
    dynamicValidation?: {
        watchField: string;
        validationRules: ValidationRulesModel;
    }
}