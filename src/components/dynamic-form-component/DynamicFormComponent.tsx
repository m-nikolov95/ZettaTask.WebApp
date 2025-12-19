
import { JSX, useEffect, useState } from 'react';

import { Button } from '@mui/material';

import { useForm } from 'react-hook-form';

import { CheckboxComponent, DropdownComponent, FieldGroupComponent, RadioButtonComponent, TextareaComponent, TextInputComponent, TextWithValidationComponent } from '../field-components';

import { MockApiService } from '../../services/mock-api-service';

import { FieldModel } from '../../models/field-models/field-model';
import { DependenciesViewModel } from '../../models/dependencies-models/view-models/dependencies-view-model';

import { DynamicFormComponentState } from '../../state/dynamic-form-component-state';

import { DynamicFormProps } from '../../props/dynamic-form-props'

import { FieldType } from '../../enums/field-type';
import { ComparisonOperator } from '../../enums/comparison-operator';

import './DynamicFormComponentStyle.css';

export function DynamicFormComponent(props: DynamicFormProps) {
    let { handleSubmit, register, reset, formState: { errors } } = useForm<DynamicFormComponentState>();

    let [dynamicFormState, setDynamicFormState] = useState<DynamicFormComponentState>({});
    let [outputJSONState, setOutputJSONState] = useState<string>('');
    let [apiCalledFields, setApiCalledFields] = useState<Set<string>>(new Set());

    useEffect(() => {
        setDynamicFormState({});
        setApiCalledFields(new Set());
    }, [props.jsonSchema]);

    useEffect(() => {
        fetchDataAndPopulateFieldsAsync();
    }, [dynamicFormState]);

    const checkTriggerFields = (field: FieldModel): boolean => {
        if (!field.apiConfiguration?.triggerFields) {
            return false;
        }

        let areTriggerFieldsFull = field.apiConfiguration.triggerFields
            .every(triggerField =>
                dynamicFormState[triggerField] !== null &&
                dynamicFormState[triggerField] !== undefined &&
                dynamicFormState[triggerField] !== ''
            );

        return areTriggerFieldsFull;
    }

    const fetchDataAndPopulateFieldsAsync = async (): Promise<void> => {
        for (let field of props.jsonSchema.fields) {
            let areTriggerFieldsFull = checkTriggerFields(field);

            let hasApiFiredForThisField = apiCalledFields.has(field.name);

            if (areTriggerFieldsFull && !hasApiFiredForThisField) {
                let apiResponse = await MockApiService.mockFetchUserAsync(dynamicFormState);

                setDynamicFormState(prevState => ({
                    ...prevState,
                    ...apiResponse
                }));

                setApiCalledFields(prevState => (
                    new Set(prevState).add(field.name)
                ));
            }
        }
    }

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

    const getFieldValue = (dynamicForm: DynamicFormComponentState, fieldName?: string): any => {
        let result = dynamicForm;
        let keys = fieldName?.split('.');

        if (keys !== null && keys !== undefined) {
            for (let key of keys) {
                result = result?.[key];
            }
        }

        return result;
    }

    const checkDependencies = (dependencyCondition: DependenciesViewModel): boolean => {
        if (dependencyCondition.visibility !== null &&
            dependencyCondition.visibility !== undefined) {
            let fieldValue = getFieldValue(dynamicFormState, dependencyCondition.visibility.field)

            switch (dependencyCondition.visibility.operator) {
                case ComparisonOperator.Equals:
                    return fieldValue === dependencyCondition.visibility.value;
                case ComparisonOperator.NotEquals:
                    return fieldValue !== dependencyCondition.visibility.value;
                case ComparisonOperator.In:
                    return dependencyCondition.visibility.value.includes(fieldValue);
                case ComparisonOperator.NotIn:
                    return !dependencyCondition.visibility.value.includes(fieldValue);
                default:
                    return true;
            }
        }

        return true;
    }

    const renderFields = (fields: FieldModel[], parentPath?: string): (JSX.Element | null)[] => {
        return fields.map((field: FieldModel) => {
            let fieldName = parentPath ? `${parentPath}.${field.name}` : field.name;

            if (field.dependencies !== null &&
                field.dependencies !== undefined &&
                !checkDependencies(field.dependencies)) {
                return null;
            }

            switch (field.type) {
                case FieldType.Text:
                    return <TextInputComponent key={fieldName}
                        fieldName={fieldName}
                        fieldLabel={field.label}
                        value={getFieldValue(dynamicFormState, fieldName) || ''}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)} />;
                case FieldType.TextWithValidation:
                    return <TextWithValidationComponent key={fieldName}
                        field={field}
                        fieldName={fieldName}
                        register={register}
                        errors={errors}
                        watchFieldValue={getFieldValue(dynamicFormState, field.dynamicValidation?.watchField)}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)} />;
                case FieldType.Checkbox:
                    return <CheckboxComponent key={fieldName}
                        fieldName={fieldName}
                        fieldLabel={field.label}
                        value={getFieldValue(dynamicFormState, fieldName) || false}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)} />;
                case FieldType.Dropdown:
                    return <DropdownComponent key={fieldName}
                        fieldName={fieldName}
                        fieldLabel={field.label}
                        value={getFieldValue(dynamicFormState, fieldName) || ''}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)}
                        options={field.options} />;
                case FieldType.Radio:
                    return <RadioButtonComponent key={fieldName}
                        fieldName={fieldName}
                        fieldLabel={field.label}
                        value={getFieldValue(dynamicFormState, fieldName) || ''}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)}
                        options={field.options} />;
                case FieldType.Textarea:
                    return <TextareaComponent key={fieldName}
                        fieldName={fieldName}
                        fieldLabel={field.label}
                        value={getFieldValue(dynamicFormState, fieldName) || ''}
                        onChange={(value) => handleOnChangeFormField(fieldName, value)}
                        rows={4} />;
                case FieldType.Group:
                    return <FieldGroupComponent key={fieldName}
                        name={field.name}
                        label={field.label}
                        fields={field.fields}
                        parentPath={parentPath}
                        onChange={handleOnChangeFormField}
                        renderFields={renderFields} />;
                default:
                    return null;
            }
        });
    }

    const onSubmitButtonClicked = (): void => {
        let outputJSON = JSON.stringify(dynamicFormState, null, 2);

        setOutputJSONState(outputJSON);
    }

    const onClearButtonClicked = (): void => {
        reset();
        
        setDynamicFormState({});
        setApiCalledFields(new Set());
        setOutputJSONState('');
    }

    return (
        <div className='dynamicFormContainer'>
            <form onSubmit={handleSubmit(onSubmitButtonClicked)}>
                {renderFields(props.jsonSchema.fields)}
                <div className='buttonContainer'>
                    <Button variant='contained' onClick={onClearButtonClicked}>Clear</Button>
                    <Button variant='contained' onClick={handleSubmit(onSubmitButtonClicked)}>Submit</Button>
                </div>

            </form>
            <div>
                {
                    outputJSONState !== null &&
                        outputJSONState !== undefined &&
                        outputJSONState !== '' ?
                        <pre className='outputJSON' data-testid="output-json">{outputJSONState}</pre> :
                        <></>
                }
            </div>
        </div>
    )
}

export default DynamicFormComponent;