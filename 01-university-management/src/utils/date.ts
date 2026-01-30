
function validateDate (date: string): Date {
    const now = new Date()

    if (date.trim() == '') {
        return now
    }
    // extracting the year, month, and day as integers
    const [year, month, day]: number[] = date.trim().split("-").map(Number)

    if (!year || !month || !day) {
        throw new Error("Wrong date format. Correct format yyyy-mm-DD eg. 2026-01-30")
    }

    if (year < 0) {
        throw new Error("Wrong year range. Can't assign a year below 0 to hire date")
    } else if (year > now.getFullYear()) {
        throw new Error("Wrong year range. Can't assign a year in the future")
    }

    if (month < 1 || month > 12) {
        throw new Error("Wrong month range. The month should be between 1 and 12")
    }
    
    if (year == now.getFullYear() && month > now.getMonth() + 1) {
        throw new Error("Wrong month range. The month should not be assigned in the future")
    }
    
    if (day > 31 || day < 1) {
        throw new Error("Wrong day range. The month day should be between 1 and 31")
    }
    
    if (year == now.getFullYear() && month == now.getMonth() + 1 && day > now.getDate()) {
        throw new Error("Wrong day. The month day should not be in the future")
    }

    const validatedDate = new Date(date.trim())

    return validatedDate
}

export { validateDate }