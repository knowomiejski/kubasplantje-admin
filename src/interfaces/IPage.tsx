import React from "react";

export interface IPageProps {
    pageTitleProp: string,
    pageUrlProp: string
}

export const genericPage = <P extends IPageProps>(Page: React.ComponentType<P>) =>
	class GenericPage extends React.Component<P, IPageProps> {
		render() {
			return <Page {...this.props as P} />;
		}
	};
