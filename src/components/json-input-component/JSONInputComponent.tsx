import { useState } from 'react';

import { Button, TextField } from '@mui/material';

import { SubmitHandler, useForm } from 'react-hook-form';

import { DynamicFormComponent } from '../dynamic-form-component/DynamicFormComponent';

import { JSONFormSchemaViewModel } from '../../models/json-form-schema-models/view-models/json-form-schema-view-model';
import { JSONInputViewModel } from '../../models/json-input-models/view-models/json-input-view-model';

import './JSONInputComponentStyles.css';

export function JSONInputComponent() {
    let { register, handleSubmit } = useForm<JSONInputViewModel>();

    let [JSONFormSchemaState, setJSONFormSchemaState] = useState<JSONFormSchemaViewModel | null>(null);

    const onSubmitButtonClicked: SubmitHandler<JSONInputViewModel> = (data: JSONInputViewModel) => {
        try {
            let parsedSchema = JSON.parse(data.jsonText);

            setJSONFormSchemaState(parsedSchema);
        } catch (error) {
            console.error('Invalid JSON format.');
        }
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
                    <div className='submitButton'>
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