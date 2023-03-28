import React, { useState } from 'react'
import Script from 'next/script'

import Image from 'next/image'
import cn from 'classnames'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { makePrompt } from '../prompt'
import { Configuration, OpenAIApi } from 'openai'
import axios from 'axios'
import parse from 'html-react-parser'
import recipeDataScraper from 'recipe-data-scraper'
import Artyom from 'artyom.js'

interface Question {
    question: string
    answer: string
    options: string[]
}

export const Landing = ({ payload }: any) => {
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
    const [art, setArt] = useState<any>()

    const openai = new OpenAIApi(configuration)
    // const parser = new DOMParser()
    // const doc = parser.parseFromString(payload, 'text/html')
    // console.log(doc.body.getElementsByTagName('main'))

    let commandHello = {
        indexes: ['hello', 'good morning', 'hey'], // These spoken words will trigger the execution of the command
        action: function () {
            // Action to be executed when a index match with spoken word
            art?.say('Hey buddy ! How are you today?')
        },
    }

    React.useEffect(() => {
        if (window && !art) {
            const Jarvis = new Artyom()

            Jarvis.say('Hello World !')

            const artyom = new Artyom()
            artyom
                .initialize({
                    lang: 'en-GB', // A lot of languages are supported. Read the docs !
                    continuous: true, // recognize 1 command and stop listening !
                    listen: true, // Start recognizing
                    debug: true, // Show everything in the console
                    speed: 1, // talk normally
                })
                .then(function () {
                    console.log('Ready to work !')
                })
                .catch((e: any) => console.log('errrrrror'))

            artyom.addCommands(commandHello)
            artyom.addCommands([
                {
                    indexes: ['Good morning'],
                    action: function (i: any) {
                        console.log('Good morning Triggered')
                    },
                },
                {
                    indexes: ['Good night'],
                    action: function (i: any) {
                        console.log('Good night Triggered')
                    },
                },
            ])

            // Or the artisan mode to write less

            artyom.on(['Good morning']).then(function (i: any) {
                console.log('Triggered')
            })
            setArt(artyom)
            artyom.say('Hey buddy ! How are you today?')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const enterQuestion = async (e: any) => {
        if (e.key === 'Enter') {
            setPrompt('')
            setErrorRep('')
            setLoading(true)

            const promptToSend = `visit this url and return the recipe to me: ${prompt}`
            try {
                console.log('sending>>>>')

                const recipe = await recipeDataScraper(prompt)

                // const { data } = await axios.get(prompt)
                // const parser = new DOMParser()
                // const doc = parser.parseFromString(data, 'text/html')
                // const sectionElement = doc.body.innerHTML

                console.log({ recipe })
                // setParsedCode(sectionElement)
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
            <Script src="artyom.window.min.js"></Script>
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
