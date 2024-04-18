import Conversation from "../models/conversarion.model.js";
import Message from "../models/message.model.js"
import {getReceiverSocketId, io} from "../socket/socket.js"

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save();
        // await newMessage.save();


        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET.IO FUNCTIONALITY WILL ADD HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
       

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error is sendMessage controller", error.message);
        req.send(500).json({error: "Internal Server Error"});
    }
}

export const getMessage = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversarion = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages");

        if (!conversarion) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversarion.messages);

    } catch (error) {
        console.log("Error is sendMessage controller", error.message);
        req.send(500).json({error: "Internal Server Error"});
    }
}