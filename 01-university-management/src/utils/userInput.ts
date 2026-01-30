import readline from 'readline'

async function question(query: string): Promise<string> {
    
    // check if stdin is paused, the menu pauses stdin when the user selects an option
    if (process.stdin.isPaused()) {
        process.stdin.resume()
    }
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

     // returns the answer as a string
    const q = (query: string): Promise<string> => {
        return new Promise(resolve => {
            // displaying the question to the terminal
            // and resolving the promise with the answer
            rl.question(`${query}: `, (answer) => resolve(answer))
        })
    }

    const answer = await q(query)

    rl.close()

    return answer
}

export { question }