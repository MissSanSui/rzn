const model = require('../../model');

let
    Chatroom = model.Chatroom;

class ChatDao {

    async queryChat(account) {
        var chat = await Chatroom.findAll({
            where:
                {
                    owner: account
                }
        });
        return chat;
    }

}
module.exports = ChatDao;