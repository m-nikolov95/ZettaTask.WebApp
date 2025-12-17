export interface TextareaProps {
    fieldName: string;
    fieldLabel: string;
    value: string;
    onChange: (value: string) => void;
    rows: number;
}