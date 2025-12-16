import { TextField } from '@mui/material';

import { TextareaProps } from '../../../props/textarea-props';

import '../FieldComponentsStyles.css';

export function TextareaComponent(props: TextareaProps) {
    return (
        <div className='field'>
            <TextField id={props.fieldName}
                label={props.fieldLabel}
                name={props.fieldName}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                variant='outlined'
                multiline
                rows={props.rows} />
        </div>
    )
}

export default TextareaComponent;