export interface IDropdownFieldProps {
    onSelectChoice(fieldNameString: string, input: string): void,
    name: string,
    value: string,
    options: string[],
    label?: string,
    disabled?: boolean,
    placeholder?: string
}