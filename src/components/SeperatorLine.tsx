import React from "react";

interface Props {
    hasOrnament: boolean;
}

const SeperatorLine = ({hasOrnament}: Props) => {
	return (
		<div className="text-base not-italic font-normal">
            { hasOrnament ? <>----------------<span className="text-primary">/</span>
			<span>/</span>
			<span className="text-secondary">/</span>---------------- </>:
            <span>-----------------------------------</span>
            }
		</div>
	);
};

export default SeperatorLine;
