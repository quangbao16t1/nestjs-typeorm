export const resultData = (statusCode, data, message, error) => {
    return {
        statusCode: statusCode,
        data: data,
        message: message,
        error: error
    }
}