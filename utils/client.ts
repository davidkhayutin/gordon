import openai from 'openai'

openai.apiKey = 'YOUR_API_KEY_HERE'

export const generatePrompts = async (model, prompt) => {
    const response = await openai.Completion.create(
        (model = model),
        (prompt = prompt),
        (max_tokens = 1024),
        (n = 1),
        (stop = None),
        (temperature = 0.5),
    )
    return response.choices[0].text
}
