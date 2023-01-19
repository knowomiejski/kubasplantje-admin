export interface IInputFieldProps {
    onChange(fieldNameString: string, input: string): void,
    name: string,
    margin: string,
    initialValue?: string | number,
    label?: string,
    disabled?: boolean,
    placeholder?: string,
    password?: boolean,
    number?: boolean
}