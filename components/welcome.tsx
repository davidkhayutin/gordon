import React from 'react'

export const Welcome = ({
    prompt,
    setPrompt,
    enterQuestion,
}: {
    prompt: string
    setPrompt: (e: any) => void
    enterQuestion: (e: any) => void
}) => {
    return (
        <div className="tw-text-center md:tw-w-3/4 tw-text-[20px]">
            <div>
                Welcome to Chat gpt trivia - a game where you can test your
                knowledge on anything!
            </div>
            <div className="tw-my-2">
                Whether its sports, your favorite tv show, mathematics or coding
                practice, this game can test your knowledge on your desired
                subject!
            </div>

            <div className="tw-my-6 tw-text-blue-10">
                To start, you will need to submit you OpenAI API key. Dont worry
                !!! This information is only stored in local state and can be
                removed with a simple refresh of the screen. Without a real key
                you wont be able to play this game. OpenAI gives you $18 of
                credit to use over your first 3 months. Each question here takes
                about 1-3 cents. NOT BAD!!
                <div className="tw-my-2 tw-text-white">
                    {' '}
                    Dont have an API Key? no worries - set on one up{' '}
                    <a
                        className="tw-underline tw-cursor-pointer tw-text-gold-50"
                        target="_blank"
                        href="https://beta.openai.com/account/api-keys"
                        rel="noreferrer"
                    >
                        here
                    </a>
                </div>
            </div>

            <div className="tw-my-6 tw-text-blue-10">
                Sometimes the answers may not be perfect, but it tries its best!
            </div>
            <div>
                <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={enterQuestion}
                    placeholder="Enter your API key"
                    className=" tw-w-[90%] sm:tw-w-[500px] tw-h-10 tw-bottom-0 tw-p-2 tw-rounded-md tw-text-blue-50"
                ></input>
            </div>
        </div>
    )
}
