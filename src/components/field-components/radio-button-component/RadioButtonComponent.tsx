import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import { RadioButtonProps } from '../../../props/radio-button-props';

import '../FieldComponentsStyles.css';

export function RadioButtonComponent(props: RadioButtonProps) {
    return (
        <div className='field'>
            <FormControl component="fieldset" className="field">
                <FormLabel component="legend" id={`${props.fieldName}-label`}>
                    {props.fieldLabel}
                </FormLabel>
                <RadioGroup
                    aria-labelledby={`${props.fieldName}-label`}
                    name={props.fieldName}
                    onChange={(e) => props.onChange(e.target.value)}>
                    {props.options?.map((option) => (
                        <FormControlLabel
                            key={option.key}
                            value={option.key}
                            control={<Radio />}
                            label={option.value}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default RadioButtonComponent;