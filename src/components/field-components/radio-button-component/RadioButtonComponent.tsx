import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import { RadioButtonProps } from '../../../props/radio-button-props';

import '../FieldComponentsStyles.css';

export function RadioButtonComponent(props: RadioButtonProps) {
    return (
        <div className='field'>
            <RadioGroup id={props.fieldName}>
                <FormLabel id={`${props.fieldName}-label`}>{props.fieldLabel}</FormLabel>
                {
                    props.options?.map((option) => (
                        <FormControlLabel key={option.key}
                            value={option.key}
                            label={option.value}
                            control={
                                <Radio value={option.key} onChange={() => props.onChange(option.key)} />
                            } />
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default RadioButtonComponent;