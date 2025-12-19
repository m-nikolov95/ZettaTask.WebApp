export interface TextInputProps {
    fieldName: string;
    fieldLabel: string;
    value: string;
    onChange: (value: string) => void;
}