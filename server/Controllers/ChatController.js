import ChatModal from "../Models/ChatModal.js";

export const createChat = async (req, res) => {
  
  const exist = await ChatModal.findOne({members:{$all:[req.body.senderId, req.body.receiverId]}})
  if(exist) return res.sendStatus(500)

  const newChat = new ChatModal({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChat = async (req, res) => {
  try {
    const chat = await ChatModal.find({
        members:{$in: [req.params.userId]}
    })
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error);
  }
};


export const findChat = async(req,res)=>{
    try {
        const chat = await ChatModal.findOne({
            members: { $all: [req.params.firstId , req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}
