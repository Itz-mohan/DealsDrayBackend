const Login = require('../schema/Login');

const CreateUser = async (req, res) => {
  try {
    var body = {
      user_name: req.body.userName,
      pwd: req.body.password,
    };

    const create = await Login.create(body);

    return res.status(200).send({ msg: 'User Created', data: create });
  } catch (err) {
    console.log({ err });
  }
};

const UserLogin = async (req, res) => {
  try {
    var validUser;
    var validPwd;
    var user;

    if (req.body.userName) {
      validUser = await Login.findOne({
        where: { user_name: req.body.userName },
      });
    }

    if (!validUser) {
      return res.status(400).send({ msg: 'Username Not Found' });
    }

    if (req.body.password) {
      validPwd = await Login.findOne({ where: { pwd: req.body.password } });
    }

    if (!validPwd) {
      return res.status(400).send({ msg: 'Invalid Password' });
    }

    var user = await Login.findOne({
      where: { user_name: req.body.userName, pwd: req.body.password },
    });

    return res.status(200).send({ msg: 'Login successfully', data: user });
  } catch (err) {
    console.log({ err });
  }
};

module.exports = { CreateUser, UserLogin };
