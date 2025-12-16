
import { JSX, useState } from 'react';

import { Button } from '@mui/material';

import { useForm } from 'react-hook-form';

import { CheckboxComponent, DropdownComponent, FieldGroupComponent, RadioButtonComponent, TextareaComponent, TextInputComponent, TextWithValidationComponent } from '../field-components';

import { FieldModel } from '../../models/field-models/field-model';

import { DynamicFormComponentState } from '../../state/dynamic-form-component-state';

import { DynamicFormProps } from '../../props/dynamic-form-props'

import { FieldType } from '../../enums/field-type';

import './DynamicFormComponentStyle.css';

export function DynamicFormComponent(props: DynamicFormProps) {
    let { handleSubmit, register, formState: { errors } } = useForm<DynamicFormComponentState>();

    let [dynamicFormState, setDynamicFormState] = useState<DynamicFormComponentState>({});
    let [outputJSONState, setOutputJSONState] = useState<string>('');

    const setNestedFieldState = (newDeepCopiedState: DynamicFormComponentState, keys: string[], value: any): void => {
        let currentState = newDeepCopiedState;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!currentState[keys[i]]) {
                currentState[keys[i]] = {};
            }

            currentState = currentState[keys[i]];
        }

        currentState[keys[keys.length - 1]] = value;

        setDynamicFormState(newDeepCopiedState);
    }

    const handleOnChangeFormField = (fieldName: string, value: any): void => {
        let keys = fieldName.split('.');

        if (keys.length === 1) {
            setDynamicFormState({
                ...dynamicFormState,
                [fieldName]: value
            });
        } else {
            let newDeepCopiedState = JSON.parse(JSON.stringify(dynamicFormState));

            setNestedFieldState(newDeepCopiedState, keys, value);
        }
    }

    const getNestedValue = (dynamicForm: DynamicFormComponentState, fieldName: string): any => {
        let result = dynamicForm;
        let keys = fieldName.split('.');

        for (let key of keys) {
            result = result?.[key];
        }

        return result;
    }

    const renderFields = (fields: FieldModel[], parentPath?: string): JSX.Element[] => {
        return fields.map((field: FieldModel) => {
            let fieldName = parentPath ? `${parentPath}.${field.name}` : field.name;

            switch (field.type) {
                case FieldType.Text:
                    return <TextInputComponent key={fieldName}
                        fieldName={fieldName}
                        fieldLabel={field.label}
                        value={getNestedValue(dynamicFormState, fieldName) || ''}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)} />;
                case FieldType.TextWithValidation:
                    return <TextWithValidationComponent key={fieldName}
                        fieldName={fieldName}
                        fieldLabel={field.label}
                        required={field.required}
                        register={register}
                        errors={errors}
                        validation={field.validation}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)} />;
                case FieldType.Checkbox:
                    return <CheckboxComponent key={fieldName}
                        fieldName={fieldName}
                        fieldLabel={field.label}
                        value={getNestedValue(dynamicFormState, fieldName) || false}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)} />;
                case FieldType.Dropdown:
                    return <DropdownComponent key={fieldName}
                        fieldName={fieldName}
                        fieldLabel={field.label}
                        value={getNestedValue(dynamicFormState, fieldName) || ''}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)}
                        options={field.options} />;
                case FieldType.Radio:
                    return <RadioButtonComponent key={fieldName}
                        fieldName={fieldName}
                        fieldLabel={field.label}
                        value={getNestedValue(dynamicFormState, fieldName) || ''}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)}
                        options={field.options} />;
                case FieldType.Textarea:
                    return <TextareaComponent key={fieldName}
                        fieldName={fieldName}
                        fieldLabel={field.label}
                        value={getNestedValue(dynamicFormState, fieldName) || ''}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)}
                        rows={4} />;
                case FieldType.Group:
                    return <FieldGroupComponent key={fieldName}
                        name={field.name}
                        label={field.label}
                        fields={field.fields}
                        parentPath={parentPath}
                        onChange={handleOnChangeFormField}
                        renderFields={renderFields}
                        collapsible={field.collapsible}
                        defaultExpanded={field.defaultExpanded} />;
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
                    {renderFields(props.jsonSchema.fields)}
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
//         { "type": "checkbox", "name": "smart", "label": "Smart" },
//         {
//             "type": "dropdown",
//             "name": "country",
//             "label": "Country",
//             "options": [
//                 { "key": "bg", "value": "Bulgaria" },
//                 { "key": "uk", "value": "United Kingdom" },
//                 { "key": "ja", "value": "Japan" }
//             ]
//         },
//         {
//             "type": "group",
//             "name": "address",
//             "label": "Address Information",
//             "fields": [
//                 { "type": "text", "name": "street", "label": "Street" },
//                 { "type": "text", "name": "city", "label": "City" }
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