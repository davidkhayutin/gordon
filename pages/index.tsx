import type { NextPage } from 'next'
import { Main } from '../components/main'
import axios from 'axios'
import { parse } from 'node-html-parser'

const Home: any = ({ payload }: { payload: string }) => {
    return (
        <>
            <title>Chat-GPT Trivia</title>
            <Main payload={payload} />
        </>
    )
}

export default Home

export async function getServerSideProps(context: any) {
    const { data } = await axios.get(
        'https://www.allrecipes.com/recipe/247365/chef-johns-steak-diane/',
    )

    return {
        props: {
            payload: data,
        }, // will be passed to the page component as props
    }
}
