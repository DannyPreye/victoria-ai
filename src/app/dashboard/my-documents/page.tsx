import MyDocumentPage from "./components";

import React from "react";

export const revalidate = 60;
const page = async () => {
    return (
        <div>
            <MyDocumentPage />
        </div>
    );
};

export default page;
