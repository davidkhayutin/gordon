import React, { useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import { FaLongArrowAltRight } from 'react-icons/fa'

const { Configuration, OpenAIApi } = require('openai')

interface Question {
    question: string
    answer: string
    options: string[]
}

export const MainChatGame = ({ apiKey }: { apiKey: string }) => {
    const easy = 'easy'
    const medium = 'medium'
    const hard = 'hard'

    const configuration = new Configuration({
        apiKey,
    })

    const buttonClass =
        'tw-text-white tw-cursor-pointer tw-px-8 tw-py-2 tw-mx-1 tw-mt-2 tw-bg-blue-20'

    const [difficulty, setDifficulty] = useState(easy)
    const [loading, setLoading] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [errorRep, setErrorRep] = useState<string>('')
    const [score, setScore] = useState<number>(0)
    const [gameOver, setGameOver] = useState<boolean>(false)

    const [registerClick, setRegisterClick] = useState(false)

    const openai = new OpenAIApi(configuration)

    const enterQuestion = async (e: any) => {
        if (e.key === 'Enter') {
            setPrompt('')
            setErrorRep('')
            setLoading(true)
            setQuestions([])
            setScore(0)
            setGameOver(false)
            setRegisterClick(false)

            const promptToSend = `Please provide an array of 10 multiple choice questions with a ${difficulty} difficulty level, in the following format:
            Copy code
            [  {    "question": "Question 1",    "answer": "Correct answer",    "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
              },
              {
                "question": "Question 2",
                "answer": "Correct answer",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
              },
              ...
            ]
            The subject of the questions is ${prompt}.
            
            Please include at least 2 questions with multiple correct answers, denoted by "all of the above" option.
            
            Please return the result in a parsed javascript array.`

            try {
                const response = await openai.createCompletion({
                    model: 'text-davinci-003',
                    temperature: 0,
                    max_tokens: 2000,
                    prompt: promptToSend,
                })

                if (response.data.choices[0].text) {
                    const parsedData: any = JSON.parse(
                        response.data.choices[0].text,
                    )

                    setLoading(false)
                    setQuestions(parsedData)
                }
            } catch (error: any) {
                setLoading(false)
                setErrorRep(error.response.data.error.message)
            }

            return
        }
    }

    const nextQuestion = () => {
        const newQuestions = questions.slice(1)

        if (newQuestions.length > 0) {
            setRegisterClick(false)
            setQuestions(newQuestions)
        }
    }

    const onAnswerClick = (answer: string) => {
        const isRightAnswer = questions[0].answer === answer
        if (isRightAnswer) {
            setScore(score + 1)
        }
        setRegisterClick(true)
        const newQuestions = questions.slice(1)
        if (newQuestions.length === 0) {
            setGameOver(true)
        }
    }

    const Question = ({ quest }: { quest: Question }) => {
        const { question, answer, options } = quest

        return (
            <>
                <div>{question}</div>
                {options &&
                    options?.length > 0 &&
                    options?.map((ans: string) => (
                        <div
                            onClick={() => onAnswerClick(ans)}
                            key={ans}
                            className={cn(
                                'tw-w-[400] tw-cursor-pointer lg:tw-w-[700px] tw-text-[18px] tw-bg-blue-10 tw-m-4 tw-p-4 tw-border-4 tw-rounded-lg',
                                {
                                    'tw-bg-red-50':
                                        registerClick && ans !== answer,
                                    'tw-bg-green-20':
                                        registerClick && ans === answer,
                                },
                            )}
                        >
                            {ans}
                        </div>
                    ))}
            </>
        )
    }

    return (
        <>
            <div className="tw-text-center md:tw-h-[470px]">
                {errorRep && !loading && (
                    <div className="tw-text-red-50 tw-text-[24px] md:tw-w-2/4 tw-m-auto">
                        {errorRep}
                    </div>
                )}

                {questions.length < 1 && !loading && (
                    <div className="tw-text-white tw-mt-20 tw-italic">
                        Please enter a subject or theme to begin playing
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

                {questions && !loading && questions.length > 0 && (
                    <div className="tw-text-white tw-flex tw-flex-col tw-text-center">
                        <div className="tw-text-right tw-text-[18px]">
                            {score}/10
                        </div>
                        <Question quest={questions[0]} />

                        <div className="tw-h-[50px] tw-flex tw-justify-center tw-w-full ">
                            {registerClick && !gameOver && (
                                <div
                                    className="tw-flex tw-items-center tw-cursor-pointer tw-mb-4"
                                    onClick={nextQuestion}
                                >
                                    {' '}
                                    NEXT QUESTION{' '}
                                    {
                                        <FaLongArrowAltRight className="tw-ml-2" />
                                    }
                                </div>
                            )}
                            {gameOver && (
                                <div
                                    className="tw-flex tw-items-center tw-mb-4"
                                    onClick={nextQuestion}
                                >
                                    Game Over! You got {score}/10 questions
                                    right!
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="tw-bottom-0 tw-mt-5 ">
                <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={enterQuestion}
                    placeholder="Enter your subject"
                    className=" tw-w-[90%] sm:tw-w-[500px] tw-h-10 tw-bottom-0 tw-p-2 tw-rounded-md tw-text-blue-50"
                ></input>
                <div className="tw-flex tw-justify-center">
                    <div
                        onClick={() => setDifficulty(easy)}
                        className={cn(buttonClass, {
                            'tw-bg-gold-50': difficulty === easy,
                        })}
                    >
                        {easy}
                    </div>
                    <div
                        onClick={() => setDifficulty(medium)}
                        className={cn(buttonClass, {
                            'tw-bg-gold-50': difficulty === medium,
                        })}
                    >
                        {medium}
                    </div>
                    <div
                        onClick={() => setDifficulty(hard)}
                        className={cn(buttonClass, {
                            'tw-bg-gold-50': difficulty === hard,
                        })}
                    >
                        {hard}
                    </div>
                </div>
            </div>
        </>
    )
}
