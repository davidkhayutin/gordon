import React, { useState } from 'react'

import { MainChatGame } from './chatGame'
import { Welcome } from './welcome'

export const Main = () => {
    const [prompt, setPrompt] = useState('')

    const [apiKeyLoaded, setApiKey] = useState<boolean>(false)

    const enterQuestion = async (e: any) => {
        if (e.key === 'Enter') {
            setApiKey(true)
        }
    }
    return (
        <div className="tw-bg-blue-50 tw-min-h-[100vh] tw-flex tw-flex-col tw-items-center tw-w-full tw-font-montserrat tw-text-white tw-p-2">
            <div className="tw-text-white tw-py-6 tw-text-center tw-text-[34px] tw-font-rubik">
                Chat GPT Trivia
            </div>
            <div className="tw-text-white tw-py-6 tw-text-center tw-text-[24px]">
                Challenge your expertise in{' '}
                <span className="tw-underline">ANY</span> subject
            </div>

            {!apiKeyLoaded ? (
                <Welcome
                    prompt={prompt}
                    setPrompt={setPrompt}
                    enterQuestion={enterQuestion}
                />
            ) : (
                <MainChatGame apiKey={prompt} />
            )}
        </div>
    )
}
