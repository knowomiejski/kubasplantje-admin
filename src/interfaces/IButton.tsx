export interface IButtonProps {
	children: React.ReactNode,
	onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
	color: string,
	hoverColor: string
}