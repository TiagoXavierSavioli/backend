const Chatroom = require('../Models/Chatroom');

exports.createChatroom = async (req, res) => {
  const { user_id } = req.params;


  if (!user_id) throw "Chatroom name can contain only alphabets.";

  const chatroomExists = await Chatroom.findOne({ user_id });

  if (chatroomExists) throw "Chatroom with that name already exists!";

  const chatroom = new Chatroom({
    user_id,
  });

  await chatroom.save();

  res.json({
    message: "Chatroom created!",
  });
};