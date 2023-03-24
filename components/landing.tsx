import React, { useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { makePrompt } from '../prompt'
import { Configuration, OpenAIApi } from 'openai'
import axios from 'axios'
import parse from 'html-react-parser'

interface Question {
    question: string
    answer: string
    options: string[]
}

export const Landing = () => {
    const configuration = new Configuration({
        organization: '',
        apiKey: '',
    })

    const [loading, setLoading] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [ingredients, setIngredients] = useState<[]>([])
    const [steps, setSteps] = useState<[]>([])
    const [errorRep, setErrorRep] = useState<string>('')
    const [parsedCode, setParsedCode] = useState<any>(undefined)

    const openai = new OpenAIApi(configuration)
    const enterQuestion = async (e: any) => {
        if (e.key === 'Enter') {
            setPrompt('')
            setErrorRep('')
            setLoading(true)

            const promptToSend = `visit this url and return the recipe to me: ${prompt}`
            try {
                const { data } = await axios.get(prompt)
                const parser = new DOMParser()
                const doc = parser.parseFromString(data, 'text/html')
                const sectionElement = doc.body.innerHTML

                console.log(sectionElement)
                setParsedCode(sectionElement)
                // const response = await openai.createChatCompletion({
                //     model: 'gpt-3.5-turbo',
                //     messages: [
                //         {
                //             role: 'user',
                //             content: `return the ingredient list and directions from this html: ${sectionElement}`,
                //         },
                //     ],
                //     temperature: 0,
                // })
                // console.log({ response })
                // if (response.data.choices[0].text) {
                //     const parsedData: any = JSON.parse(
                //         response.data.choices[0].text,
                //     )

                //     console.log({ parsedData })
                //     setLoading(false)
                //     setIngredients(parsedData[0])
                //     setSteps(parsedData[1])
                // }
            } catch (error: any) {
                setLoading(false)
                console.log(error.response)
                // setErrorRep(error.response.data.error.message)
            }

            return
        }
    }
    console.log()
    return (
        <>
            <div className="tw-text-center md:tw-h-[470px]">
                {errorRep && !loading && (
                    <div className="tw-text-red-50 tw-text-[24px] md:tw-w-2/4 tw-m-auto">
                        {errorRep}
                    </div>
                )}
                {loading && (
                    <Image
                        src={'/loading.svg'}
                        height={200}
                        width={200}
                        className="tw-m-auto tw-pt-10"
                        alt="Loading icon"
                    />
                )}
                {ingredients &&
                    steps &&
                    !loading &&
                    // ingredients.length > 0 &&
                    steps.length > 0 && (
                        <div className=" tw-flex tw-flex-col tw-text-center">
                            {steps.map((step: any) => (
                                <div key={step}>{step}</div>
                            ))}
                        </div>
                    )}
            </div>

            {/* {parsedCode && parse(parsedCode)} */}

            <div className="tw-bottom-0 tw-mt-5 ">
                <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={enterQuestion}
                    placeholder="Enter your recipes website"
                    className=" tw-w-[90%] sm:tw-w-[600px] tw-h-12 tw-bottom-0 tw-p-2 tw-border-2 tw-border-purple-40 tw-rounded-md tw-text-blue-50"
                ></input>
            </div>
        </>
    )
}
