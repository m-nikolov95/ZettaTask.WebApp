export interface RadioButtonProps {
    fieldName: string;
    fieldLabel: string;
    value: string;
    onChange: (value: string) => void;
    options: { key: string; value: string }[];
}