import { Checkbox, FormControlLabel } from '@mui/material';

import { CheckboxProps } from '../../../props/checkbox-props';

import '../FieldComponentsStyles.css';

export function CheckboxComponent(props: CheckboxProps) {
    return (
        <div className='field'>
            <FormControlLabel id={props.fieldName}
                label={props.fieldLabel}
                control={
                    <Checkbox
                        checked={props.value || false}
                        onChange={(e) => props.onChange(e.target.checked)} />
                } />
        </div>
    )
}

export default CheckboxComponent;