import * as readline from 'readline'

type MenuOptions = {
    [key: string]: () => void
}

async function menu(options: MenuOptions, heading: string): Promise<void> {
    // clear screen before displaying for information
    console.clear()
    
    // option selected by the user
    let option = 0
    let length = Object.keys(options).length
    // store an array of the actions in the menu options
    let actions = Object.values(options);

    drawOptions(Object.keys(options), heading, option)

    while (true) {

        const keyName = await getUserInput()

        if (keyName == 'up') {
           if (option == 0) {
                option = length - 1
            } else {
                option--
            }
            drawOptions(Object.keys(options), heading, option) 
        } else if (keyName == 'down') {
            if (option == length - 1) {
                option = 0
            } else {
                option++;
            }
            drawOptions(Object.keys(options), heading, option)
        } else if (keyName == 'return') {
            // user's selected option is stored in the option variable
            // stop getting input through stdin
            process.stdin.pause()
            // breaking the loop, the action is called outside the while loop
            break
        }
    }
    // after exiting the loop, the user selected the option
    // getting the action from the array of actions
    let action = actions[option]

    // checking the action is valid
    if (action) {
        // calling the action
        action()
    } else {
        // exitting the program if not valid
        console.log("Error selecting option")
        process.exit()
    }
}

function drawOptions(options: string[], heading: string, optionNum: number) {

    console.clear()

    // print the heading with bold text
    console.log('\x1b[1m%s\x1b[0m', heading)

    // number of the option, used to print to screen
    let iteration = 1
    for (const option of options) {
        let highlight = null
        // create a green background if the option is selected
        if (iteration == (optionNum + 1)) {
            highlight = '    \x1b[42m%s\x1b[0m'
        }

        if (highlight) {
            // print the number of the option with the string option
            // include the tab in the highlight variable so only the text gets
            // highlighted
            console.log(highlight, `${iteration}. ${option}`)
        } else {
            // print the number of the option with the string option
            // add tab to make it prettier
            console.log(`    ${iteration}. ${option}`)
        }

        iteration++;
    }
}

function getUserInput(): Promise<string> {

    // resume stdin input if it is paused
    // everytime the user selects an option, stdin is paused
    if (process.stdin.isPaused()) {
        process.stdin.resume()
    }

    return new Promise(resolve => {
        readline.emitKeypressEvents(process.stdin)

        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true)
        }

        const handler = (str: string, key: any) => {

            process.stdin.removeListener('keypress', handler)
            process.stdin.setRawMode(false)
            if (key.ctrl && key.name == 'c') {
                process.exit()
            }
            resolve(key.name)
        }
        process.stdin.once('keypress', handler)
    })
}

export { menu }