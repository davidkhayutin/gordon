import React, { useState } from 'react'

import { Landing } from './landing'

export const Main = ({ payload }: any) => {
    return (
        <div className="tw-min-h-[100vh] tw-flex tw-flex-col tw-text-black-40 tw-bg-grey-10 tw-items-center tw-w-full tw-font-poppins tw-p-10">
            <h1 className="tw-text-[34px]">Welcome to Gordon</h1>
            <h4 className="tw-text-[18px]">Your personal sous chef</h4>

            <h4 className="tw-my-4">
                Gordon uses Artificial Intelligence to help you on daily cooking
                adventures. Whether it is your own recipe, or a your favorite
                bloggers, Gordan is here to help
            </h4>

            <h4 className="tw-text-[18px]">How it works?</h4>
            <Landing payload={payload} />
        </div>
    )
}
