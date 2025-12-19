export interface CheckboxProps {
    fieldName: string;
    fieldLabel: string;
    value: boolean;
    onChange: (value: boolean) => void;
}