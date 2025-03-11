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