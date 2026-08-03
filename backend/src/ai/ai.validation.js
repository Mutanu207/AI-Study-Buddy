export const preDocumentValiadtion = async (session_id, file_path) => {
    if(!session_id){
        throw new Error("No session id provided")
    }
    if(!file_path){
        throw new Error("No file path provided")
    }
    }

export const postQuestionValidation = async (response) => {
    if(!response){
        throw new Error("No data received")
    }
    
}

export const preAnswersValidation = async (payload) => {
    if(!payload){
        throw new Error("No payload provided")
    }
    if(!payload.sessionId){
        throw new Error("No session id provided")
    }
    if(!payload.answers || !Array.isArray(payload.answers) || payload.answers.length === 0){
        throw new Error("No answers provided")
    }
}

export const postFeedbackValidation = async (response) => {
    if(!response){
        throw new Error("No data received")
    }
    
}