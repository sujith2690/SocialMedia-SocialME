import MessageModal from "../Models/MessageModal.js";

export const addMessage = async(req,res)=>{
    try {
        const {chatId,senderId,text} = req.body
        const message = new MessageModal({
            chatId,
            senderId,
            text
        })
        const result = await message.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getMesssages = async(req,res)=>{
    try {
        const {chatId} = req.params
        const result = await MessageModal.find({chatId})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}
