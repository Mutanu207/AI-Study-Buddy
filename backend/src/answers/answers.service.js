import { saveUserAnswers, getAnswerContext } from "./answers.model.js";
import { evaluateAnswers } from "../ai/ai.service.js";
import { receiveFeedback } from "../feedback/feedback.service.js";
export const userAnswers = async (sessionId, answers) => { //answers is an array
    try {
        const answersForEvaluation = [];
        //for one answer object in the array save the info to answers db, return the info, use question id of the naswer object
        //and fetch the remaining info to send to ai folder, combine both to one object, then push object to the array we will send to the ai folder, one object at a time
        for(const answer of answers){
            //save info to answer db
        const savedAnswer= await saveUserAnswers({sessionId,
                               questionId: answer.questionId,
                                userAnswer: answer.userAnswer});
        //use ques id to grab info form questions table
        const answerContext=  await getAnswerContext(answer.questionId);
        //combine both info to one object, then push object to the array we will send to the ai folder, one object at a time
        const enrichedAnswer= {
            ...savedAnswer, //returns answer_id and user_answer
            ...answerContext //must return question,refrence_answer,chunk_index
        }
        answersForEvaluation.push(enrichedAnswer);}
                                
          const payload = {

            sessionId,

            answers: answersForEvaluation,

        };
        console.log(payload)
        //send to ai folder which bridges to the python server what we get back is the feedback
        const feedback= await evaluateAnswers(payload);
        console.log("Feedback from AI evaluation:", feedback); 
        //send feedback from ai to feedback folder
        await receiveFeedback(feedback)

        
    } catch (error) {
        console.error("Error saving answers:", error);
    }
}