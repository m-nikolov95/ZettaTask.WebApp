
import { JSX, useState } from 'react';

import { Button } from '@mui/material';

import { useForm } from 'react-hook-form';

import { CheckboxComponent, DropdownComponent, RadioButtonComponent, TextareaComponent, TextInputComponent, TextWithValidationComponent } from '../field-components';

import { FieldModel } from '../../models/field-models/field-model';

import { DynamicFormComponentState } from '../../state/dynamic-form-component-state';

import { DynamicFormProps } from '../../props/dynamic-form-props'

import { FieldType } from '../../enums/field-type';

import './DynamicFormComponentStyle.css';

export function DynamicFormComponent(props: DynamicFormProps) {
    let { handleSubmit, register, formState: { errors } } = useForm<DynamicFormComponentState>();

    let [dynamicFormState, setDynamicFormState] = useState<DynamicFormComponentState>({});
    let [outputJSONState, setOutputJSONState] = useState<string>('');

    const handleOnChangeFormField = (fieldName: string, value: any): void => {
        setDynamicFormState({
            ...dynamicFormState,
            [fieldName]: value
        });
    }

    const renderFields = (): JSX.Element[] => {
        return props.jsonSchema.fields.map((field: FieldModel) => {
            switch (field.type) {
                case FieldType.Text:
                    return <TextInputComponent key={field.name}
                        fieldName={field.name}
                        fieldLabel={field.label}
                        value={dynamicFormState[field.name] || ''}
                        onChange={(value) => handleOnChangeFormField(field.name, value)} />;
                case FieldType.TextWithValidation:
                    return <TextWithValidationComponent key={field.name}
                        fieldName={field.name}
                        fieldLabel={field.label}
                        required={field.required}
                        register={register}
                        errors={errors}
                        validation={field.validation}
                        onChange={(value) => handleOnChangeFormField(field.name, value)} />;
                case FieldType.Checkbox:
                    return <CheckboxComponent key={field.name}
                        fieldName={field.name}
                        fieldLabel={field.label}
                        value={dynamicFormState[field.name] || false}
                        onChange={(value) => handleOnChangeFormField(field.name, value)} />;
                case FieldType.Dropdown:
                    return <DropdownComponent key={field.name}
                        fieldName={field.name}
                        fieldLabel={field.label}
                        value={dynamicFormState[field.name] || ''}
                        onChange={(value) => handleOnChangeFormField(field.name, value)}
                        options={field.options} />;
                case FieldType.Radio:
                    return <RadioButtonComponent key={field.name}
                        fieldName={field.name}
                        fieldLabel={field.label}
                        value={dynamicFormState[field.name] || ''}
                        onChange={(value) => handleOnChangeFormField(field.name, value)}
                        options={field.options} />;
                case FieldType.Textarea:
                    return <TextareaComponent key={field.name}
                        fieldName={field.name}
                        fieldLabel={field.label}
                        value={dynamicFormState[field.name] || ''}
                        onChange={(value) => handleOnChangeFormField(field.name, value)}
                        rows={4} />;
                default:
                    return <></>;
            }
        });
    }

    const onSubmitButtonClicked = (): void => {
        let outputJSON = JSON.stringify(dynamicFormState, null, 2);

        setOutputJSONState(outputJSON);
    }

    return (
        <div className='dynamicFormContainer'>
            <form onSubmit={handleSubmit(onSubmitButtonClicked)}>
                <div>
                    {renderFields()}
                    <div className='submitButton'>
                        <Button variant='contained' onClick={handleSubmit(onSubmitButtonClicked)}>Submit</Button>
                    </div>
                </div>
            </form>
            <div>
                {
                    outputJSONState !== null &&
                        outputJSONState !== undefined &&
                        outputJSONState !== '' ?
                        <pre className='outputJSON'>{outputJSONState}</pre> :
                        <></>
                }
            </div>
        </div>
    )
}

export default DynamicFormComponent;

// {
//     "fields": [
//         { "type": "text", "name": "firstName", "label": "First Name" },
//         { "type": "text", "name": "middleName", "label": "Middle Name" },
//         { "type": "checkbox", "name": "retarted", "label": "Retarted" },
//         {
//             "type": "dropdown",
//             "name": "country",
//             "label": "Country",
//             "options": [
//                 { "key": "us", "value": "United States" },
//                 { "key": "uk", "value": "United Kingdom" },
//                 { "key": "ca", "value": "Canada" }
//             ]
//         },
//         {
//             "type": "radio",
//             "name": "gender",
//             "label": "Gender",
//             "options": [
//                 { "key": "male", "value": "Male" },
//                 { "key": "female", "value": "Female" }
//             ]
//         },
//         {
//             "type": "textWithValidation",
//             "name": "phoneNumber",
//             "label": "Phone Number",
//             "validation": {
//                 "pattern": "^[0-9]+$",
//                 "minLength": 10,
//                 "maxLength": 10
//             }
//         }
//     ]
// }