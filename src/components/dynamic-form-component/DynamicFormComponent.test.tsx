import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DynamicFormComponent } from './DynamicFormComponent';

import { JSONFormSchemaViewModel } from '../../models/json-form-schema-models/view-models/json-form-schema-view-model';

import { FieldType } from '../../enums/field-type';

test('renders form with provided fields', () => {
    const jsonSchema = {
        fields: [
            { type: FieldType.Text, name: 'firstName', label: 'First Name' },
            { type: FieldType.Text, name: 'lastName', label: 'Last Name' },
            { type: FieldType.Checkbox, name: 'isSmart', label: 'Are you smart' },
            {
                type: FieldType.Dropdown, name: 'country', label: 'Country',
                options: [
                    { key: 'bg', value: 'Bulgaria' },
                    { key: 'uk', value: 'United Kingdom' },
                    { key: 'ja', value: 'Japan' }
                ]
            },
            {
                type: FieldType.Group, name: 'address', label: 'Address Information',
                fields: [
                    { type: FieldType.Text, name: 'street', label: 'Street' },
                    { type: FieldType.Text, name: 'city', label: 'City' },
                ]
            },
            {
                type: FieldType.Radio, name: 'gender', label: 'Gender',
                options: [
                    { key: 'male', value: 'Male' },
                    { key: 'female', value: 'Female' },
                ]
            },
            {
                type: FieldType.TextWithValidation, name: 'phoneNumber', label: 'Phone Number',
                validationRules: { pattern: '^[0-9]{10}$', minLength: 10, maxLength: 10 }
            }
        ]
    } as JSONFormSchemaViewModel;

    render(<DynamicFormComponent jsonSchema={jsonSchema} />);

    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Are you smart')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Street')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
});


test('shows/hides field based on dependency', async () => {
    const jsonSchema = {
        fields: [
            {
                type: FieldType.Dropdown, name: 'userType', label: 'User Type',
                options: [
                    { key: 'student', value: 'Student' },
                    { key: 'employee', value: 'Employee' },
                    { key: 'freelancer', value: 'Freelancer' }
                ]
            },
            {
                type: FieldType.Text, name: 'studentId', label: 'Student ID',
                dependencies: {
                    visibility: { field: 'userType', operator: 'equals', value: 'student' }
                }
            },
            {
                type: FieldType.Text, name: 'employeeId', label: 'Employee ID',
                dependencies: {
                    visibility: { field: 'userType', operator: 'equals', value: 'employee' }
                }
            }

        ]
    } as JSONFormSchemaViewModel;

    render(<DynamicFormComponent jsonSchema={jsonSchema} />);

    expect(screen.queryByLabelText('Student ID')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Employee ID')).not.toBeInTheDocument();

    fireEvent.mouseDown(screen.getByLabelText('User Type'));
    fireEvent.click(await screen.findByText('Student'));

    expect(screen.getByLabelText('Student ID')).toBeInTheDocument();
    expect(screen.queryByLabelText('Employee ID')).not.toBeInTheDocument();
});


test('submits form and outputs values', async () => {
    const jsonSchema = {
        fields: [
            { type: FieldType.Text, name: 'firstName', label: 'First Name' },
            { type: FieldType.Text, name: 'lastName', label: 'Last Name' },
            { type: FieldType.Checkbox, name: 'isSmart', label: 'Are you smart' },
            { type: FieldType.Textarea, name: 'description', label: 'Describe yourself' }
        ]
    } as JSONFormSchemaViewModel;

    render(<DynamicFormComponent jsonSchema={jsonSchema} />);

    fireEvent.change(screen.getByLabelText(/First Name/), { target: { value: 'Georgi' } });
    fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: 'Tomov' } });
    fireEvent.click(screen.getByLabelText(/Are you smart/));
    fireEvent.change(screen.getByLabelText(/Describe yourself/), { target: { value: 'Best Guy to know.' } });
    fireEvent.click(screen.getByText('Submit'));

    const outputPre = await screen.findByTestId('output-json');

    const parsed = JSON.parse(outputPre.textContent!);

    expect(parsed).toEqual({
        firstName: 'Georgi',
        lastName: 'Tomov',
        isSmart: true,
        description: 'Best Guy to know.'
    });
});