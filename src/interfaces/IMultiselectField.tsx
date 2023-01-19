export interface IMultiselectField {
    onSelectChoice(fieldNameString: string, input: string, add: boolean): void,
    name: string,
    selectedValues: string[],
    options: string[],
    label?: string,
    disabled?: boolean,
    placeholder?: string
}