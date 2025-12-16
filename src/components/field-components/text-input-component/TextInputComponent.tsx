import { TextField } from '@mui/material';

import { TextInputProps } from '../../../props/text-input-props';

import '../FieldComponentsStyles.css';

export function TextInputComponent(props: TextInputProps) {
  return (
    <div className='field'>
      <TextField id={props.fieldName}
        label={props.fieldLabel}
        name={props.fieldName}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        variant='standard' />
    </div>
  )
}

export default TextInputComponent;