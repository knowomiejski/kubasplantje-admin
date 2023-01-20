export interface IButtonProps {
	children: React.ReactNode,
	onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
	onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void,
	color: string,
	hoverColor: string
}