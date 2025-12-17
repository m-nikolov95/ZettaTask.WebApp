import { TextField } from '@mui/material';

import { TextInputWithCustomValidationProps } from '../../../props/text-input-with-custom-validation-props';

import '../FieldComponentsStyles.css';

export function TextWithValidationComponent(props: TextInputWithCustomValidationProps) {
    let validationPatter = props.validation.pattern ?
        new RegExp(props.validation.pattern) :
        undefined;

    return (
        <>
            <div className='field'>
                <TextField id={props.fieldName}
                    label={props.fieldLabel}
                    variant='standard'
                    {...props.register(props.fieldName, {
                        required: props.required,
                        minLength: props.validation.minLength,
                        maxLength: props.validation.maxLength,
                        pattern: validationPatter,
                        onChange: (e) => { props.onChange(e.target.value) }
                    })} />
            </div>
            <div>
                <span className='errorMessage'>
                    {props.errors[props.fieldName]?.type === 'required' && 'This field is required.'}
                    {props.errors[props.fieldName]?.type === 'pattern' && 'Please enter a valid format.'}
                    {props.errors[props.fieldName]?.type === 'minLength' && `Minimum length is ${props.validation.minLength}.`}
                    {props.errors[props.fieldName]?.type === 'maxLength' && `Maximum length is ${props.validation.maxLength}.`}
                </span>
            </div>
        </>
    )
}

export default TextWithValidationComponent;