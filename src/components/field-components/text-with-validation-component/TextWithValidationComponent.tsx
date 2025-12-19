import { TextField } from '@mui/material';

import { RuleStructureModel } from '../../../models/validation-models/rule-structure-model';

import { TextWithValidationProps } from '../../../props/text-with-validation-props';

import '../FieldComponentsStyles.css';

export function TextWithValidationComponent(props: TextWithValidationProps) {
    const resolveValidationType = (): RuleStructureModel | undefined => {
        if (props.field.dynamicValidation) {
            return (
                props.field.dynamicValidation.validationRules[props.watchFieldValue] ||
                props.field.dynamicValidation.validationRules.default
            );
        }

        return props.field.validation;
    };

    let currentRule = resolveValidationType();

    return (
        <>
            <div className='field'>
                <TextField id={props.fieldName}
                    label={props.field.label}
                    variant='standard'
                    {...props.register(props.fieldName, {
                        required: props.field.required,
                        minLength: currentRule?.minLength ?
                            { value: Number(currentRule.minLength), message: currentRule.errorMessage } :
                            undefined,
                        maxLength: currentRule?.maxLength ?
                            { value: Number(currentRule.maxLength), message: currentRule.errorMessage } :
                            undefined,
                        pattern: currentRule?.pattern ?
                            { value: new RegExp(currentRule.pattern), message: currentRule.errorMessage } :
                            undefined,
                        onChange: e => props.onChange(e.target.value),
                    })}
                />
            </div>
            <div>
                {
                    <span className='errorMessage'>
                        {props.errors[props.fieldName]?.type === 'required' && 'This field is required.'}
                        {props.errors[props.fieldName]?.type === 'pattern' && currentRule?.errorMessage}
                        {props.errors[props.fieldName]?.type === 'minLength' && currentRule?.errorMessage}
                        {props.errors[props.fieldName]?.type === 'maxLength' && currentRule?.errorMessage}
                    </span>
                }
            </div>
        </>
    )
}

export default TextWithValidationComponent;