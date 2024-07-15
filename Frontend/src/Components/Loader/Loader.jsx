import React from 'react'
import { DNA } from "react-loader-spinner"

export const DnaLoader = () => {
    return (
        <>
            <DNA
                visible={true}
                height="40"
                width="40"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </>
    )
}
