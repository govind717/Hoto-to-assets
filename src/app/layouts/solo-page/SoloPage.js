import React from "react";
import JumboLayout from "@jumbo/components/JumboLayout";
import useJumboLayout from "@jumbo/hooks/useJumboLayout";
import layoutConfig from "./layoutConfig";

const SoloPage = ({children}) => {
    const {setJumboLayoutOptions} = useJumboLayout();

    // React.useEffect(() => {
    //     layoutConfig.sidebar.open = false
    //     setJumboLayoutOptions(layoutConfig);
    // }, [layoutConfig.sidebar.open]);

    React.useEffect(() => {
        setJumboLayoutOptions(layoutConfig);
    }, []);

    return (
        <JumboLayout>
            {children}
        </JumboLayout>
    );
};

export default SoloPage;
