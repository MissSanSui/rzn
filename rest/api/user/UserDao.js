const model = require('../../model');

let
    Student = model.Student;
    User = model.User;

class UserDao {

    async createUser(user) {
        await User.create(user)
            .then(function (p) {
              console.log("sss");
              return user;
            }).catch(function (err) {
              console.log(err);
              return user;
            });
      }

    async queryUser(account) {
        var users = await User.findAll({
            where:
                {
                    account: account
                }
        });
        return users;
    }

    async queryUsers() {
        var users = await User.findAll({
        });
        return users;
    }


}
module.exports = UserDao;