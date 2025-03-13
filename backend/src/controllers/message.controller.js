import cloudinary from "../lib/cloudinary.js";
import message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({
            _id: { $ne: loggedInUserId }
        }.select("-password"));
        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error in getUserForSideBar", error.message);
        res.status(500).json("Internal Server Error");

    }
}
export const getMessage = async (req, res) => {
    try {
        const { id: userToChat } = req.params;
        const myId = req.user._id;
        const message = await User.find({
            $or: [
                {
                    senderId: myId, recieverId: userToChat
                },
                {
                    senderId: userToChat, recieverId: myId
                }
            ]
        });
        res.status(200).json(message)
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    }

}
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const senderId = req.user._id;
        const { id: recieverId } = req.params;
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        };
        const newMessage = [{
            senderId,
            recieverId,
            text,
            image: imageUrl
        }];
        await newMessage.save();
        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage", error.message);
        res.status(500).json("Internal Serber Error");
    }

}