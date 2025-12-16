import { FieldGroupProps } from '../../../props/field-group-props';

import './FieldGroupComponentStyles.css';

export function FieldGroupComponent(props: FieldGroupProps) {
    let groupPath = props.parentPath ?
        `${props.parentPath}.${props.name}` :
        props.name;

    return (
        <div className='fieldGroupContainer'>
            <fieldset>
                <legend className='legend'>{props.label}</legend>
                <div>
                    {props.renderFields(props.fields, groupPath)}
                </div>
            </fieldset>
        </div>
    )
}

export default FieldGroupComponent;