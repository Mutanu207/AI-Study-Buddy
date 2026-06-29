export const newSessions = async (docid,userid) => {
    try{
        const session= await createNewSessions(docid,userid)
        console.log(session)
        return {id:session.id}
    }
    catch{
        console.error(error)
    }
}

