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

async function collectStudentId(): Promise<number> {
    // collect the student id 
    while (true) {
        const raw = await question("Please the student id")
        
        if (raw.trim() == '') {
            console.log("Student id is is empty, please input a student id")
            continue
        }

        const parsed = Number(raw)
        if (isNaN(parsed) || !Number.isInteger(parsed)) {
            console.log("The input student id is not valid, please try again")
            continue
        }

        return parsed
    }
}

async function collectCourseId(): Promise<number> {
    // collect course id
    while (true) {
        const raw = await question("Please the course id")
        
        if (raw.trim() == '') {
            console.log("Course is is empty, please input a course id")
            continue
        }

        const parsed = Number(raw)
        if (isNaN(parsed) || !Number.isInteger(parsed)) {
            console.log("The input course id is not valid, please try again")
            continue
        }

        return parsed
    }
}

export { question, collectCourseId, collectStudentId }