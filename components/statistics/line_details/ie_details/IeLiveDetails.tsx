import React from 'react';

const IeLiveDetails = () => {
    return (
        <div className={" h-full flex flex-col i text-neutral-900 border border-black bg-background"}>
            <div className={"flex flex-row gap-4"}>
                <h3 className={"text-xl"}>Line</h3>
                <h3 className={"font-semibold text-xl"}>J01</h3>
            </div>
            <div className={"flex flex-row gap-4"}>
                <h3 className={"text-2xl"}>Model</h3>
                <h3 className={"font-bold text-xl"}>LUXOR</h3>
            </div>
            <div className={"flex flex-row gap-4"}>
                <h3 className={"text-2xl"}>SKU</h3>
                <h3 className={"font-bold text-xl"}>Y0MMY</h3>
            </div>
            <div className={"flex flex-row gap-4"}>
                <h3 className={"text-2xl"}>UPH</h3>
                <h3 className={"font-bold text-xl"}>195</h3>
            </div>
            <div className={"flex flex-row gap-4"}>
                <h3 className={"text-2xl"}>OEE</h3>
                <h3 className={"font-bold text-xl"}>65%</h3>
            </div>
            <div className={"flex flex-row gap-4"}>
                <h3 className={"text-2xl"}>PH</h3>
                <h3 className={"font-bold text-xl"}>15.5h</h3>
            </div>
        </div>
    )
};

export default IeLiveDetails;