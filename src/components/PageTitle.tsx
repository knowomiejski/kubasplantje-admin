import React, { useEffect, useState } from "react";
import SeperatorLine from "./SeperatorLine";

interface Props {
    pageTitleProp: string
}

const PageTitle = ({pageTitleProp}: Props) => {

    const [pageTitle, setPageTitle] = useState<string>(pageTitleProp)
    useEffect(() => {
        console.log(`Title component changed from ${pageTitle} to ${pageTitleProp}`)
        let tempPageTitle = pageTitleProp.toLowerCase().split("").join(" ")
        setPageTitle(tempPageTitle)
        return () => {
            console.log('unmount')
        }
    }, [])

    return (
        <div className="text-xl my-5 mx-1 italic font-bold text-center">
            <SeperatorLine hasOrnament={false}/>
            <pre className="text-lg">{pageTitle}</pre>
            <SeperatorLine hasOrnament={false}/>
        </div>
    );
};

export default PageTitle;
