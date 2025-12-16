import { JSX } from 'react';

import { FieldModel } from '../models/field-models/field-model';

export interface FieldGroupProps {
    name: string;
    label: string;
    fields: FieldModel[];
    collapsible?: boolean;
    defaultExpanded?: boolean;
    parentPath?: string;
    onChange: (fieldName: string, value: any) => void;
    renderFields: (fields: FieldModel[], parentPath?: string) => JSX.Element[];
}