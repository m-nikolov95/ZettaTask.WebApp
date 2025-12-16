import { CheckboxFieldViewModel } from './view-models/checkbox-view-model';
import { DropdownViewModel } from './view-models/dropdown-veiw-model';
import { RadioFieldViewModel } from './view-models/radio-button-view-model';
import { TextViewModel } from './view-models/text-view-model';
import { TextWithValidationViewModel } from './view-models/text-with-validation-view-model';
import { TextareaFieldViewModel } from './view-models/textarea-view-model';
import { GroupFieldViewModel } from './view-models/group-field-view-model';

export type FieldModel = TextViewModel | TextareaFieldViewModel | DropdownViewModel | CheckboxFieldViewModel | RadioFieldViewModel | TextWithValidationViewModel | GroupFieldViewModel;