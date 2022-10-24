import React from "react";

const UserContext = React.createContext({
    isLoading: false,
    user: {},
    errorState: false,
    errorStateMessage: ''
})

export {UserContext}