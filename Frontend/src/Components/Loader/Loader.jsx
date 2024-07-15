import React from 'react'
import {DNA} from "react-loader-spinner"

export const DnaLoader = () => {
    return (
        <>
            <DNA
                visible={true}
                height="50"
                width="50"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </>
    )
}
