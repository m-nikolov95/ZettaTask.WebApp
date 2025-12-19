import { useEffect, useState } from 'react';

import { Button, TextField } from '@mui/material';

import { SubmitHandler, useForm } from 'react-hook-form';

import { DynamicFormComponent } from '../dynamic-form-component/DynamicFormComponent';

import { JSONFormSchemaViewModel } from '../../models/json-form-schema-models/view-models/json-form-schema-view-model';
import { JSONInputViewModel } from '../../models/json-input-models/view-models/json-input-view-model';

import './JSONInputComponentStyles.css';

export function JSONInputComponent() {
    let { register, handleSubmit, setValue, reset } = useForm<JSONInputViewModel>();

    let [JSONFormSchemaState, setJSONFormSchemaState] = useState<JSONFormSchemaViewModel | null>(null);

    useEffect(() => {
        let jsonSchema = localStorage.getItem('schema');

        if (jsonSchema !== null && jsonSchema !== undefined) {
            setJSONFormSchemaState(JSON.parse(jsonSchema));

            setValue('jsonText', jsonSchema);
        }
    }, []);

    const onSubmitButtonClicked: SubmitHandler<JSONInputViewModel> = (data: JSONInputViewModel) => {
        try {
            let parsedSchema = JSON.parse(data.jsonText);

            setJSONFormSchemaState(parsedSchema);

            localStorage.setItem('schema', JSON.stringify(parsedSchema));
        } catch (error) {
            console.error('Invalid JSON format.');
        }
    }

    const onClearButtonClicked = (): void => {
        reset();
        
        setJSONFormSchemaState(null);

        localStorage.removeItem('schema');
    }

    return (
        <div className='jsonInputContainer'>
            <form onSubmit={handleSubmit(onSubmitButtonClicked)}>
                <div>
                    <TextField id='standard-basic'
                        label='JSON'
                        variant='standard'
                        multiline
                        {...register('jsonText')} />
                    <div className='buttonContainer'>
                        <Button variant='contained' onClick={onClearButtonClicked}>Clear All</Button>
                        <Button variant='contained' onClick={handleSubmit(onSubmitButtonClicked)}>Submit</Button>
                    </div>
                </div>
            </form>
            {
                JSONFormSchemaState !== null &&
                    JSONFormSchemaState !== undefined ?
                    <div>
                        <DynamicFormComponent jsonSchema={JSONFormSchemaState} />
                    </div> :
                    <></>
            }
        </div>
    )
}

export default JSONInputComponent;