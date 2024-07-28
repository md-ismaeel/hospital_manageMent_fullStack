import React from 'react'
import { DNA, TailSpin } from "react-loader-spinner"

export const DnaLoader = () => {
    return (
        <>
            <DNA
                visible={true}
                height="30"
                width="40"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </>
    )
}

export const TailSpinLoader = () => {
    return (
        <>
            <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#FFFFFF"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </>
    )

}
