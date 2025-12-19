import { InputLabel, MenuItem, Select } from '@mui/material';

import { DropdownProps } from '../../../props/dropdown-props';

import './DropdownComponent.css';

export function DropdownComponent(props: DropdownProps) {
    return (
        <div className='dropdownContainer'>
            <InputLabel id={`${props.fieldName}-label`}>
                {props.fieldLabel}
            </InputLabel>
            <Select id={props.fieldName}
                labelId={`${props.fieldName}-label`}
                value={props.value}
                label={props.fieldLabel}
                onChange={(e) => props.onChange(e.target.value)}>
                {
                    props.options?.map((option) => (
                        <MenuItem key={option.key} value={option.key}>{option.value}</MenuItem>
                    ))
                }
            </Select>
        </div>
    )
}

export default DropdownComponent;