const { BrokenCode, BadRequest, NotFound } = require('../error');
const User = require('./model');

exports.createUser = async (req, res, next) => {
    
    try {

        const { email } = req.body;

        const found = await User.findOne({ email });

        if (found) return BadRequest(res, 'email is taken!');

        const user = await User.create({ ...req.body });

        res.status(200).json({
            status: true,
            data: user
        });
    } catch (error) {
        console.log(error);

        if (error.message.toLowerCase().includes('validation')) return BadRequest(res, error.message);

        return BrokenCode(res);
    }
}

exports.findAllUsers = async (req, res, next) => {
    try {
        const query = req.query;

        const users = await User.find({ ...query });


        res.status(200).json({
            status: true,
            data: users
        });
    } catch (error) {
        console.log(error);
        return BrokenCode(res);
    }
}

exports.findUser = async (req, res, next) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });

        if (!user) return NotFound('User not found!');

        res.status(200).json({
            status: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        return BrokenCode(res);
    }
}

exports.findMe = async (req, res, next) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id);

        if (!user) return NotFound('User not found!');

        res.status(200).json({
            status: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        return BrokenCode(res);
    }
}

exports.patchMe = async (req, res, next) => {
    try {
        const { email } = req.user;
        const { email: newEmail, password, ...rest } = req.body;

        if (!(await User.findOne({ email }))) return NotFound(res, 'User not Found! Please Log In.');


        if ((await User.findOne({ email: newEmail }))) return BadRequest(res, 'new email is taken!');

        const user = await User.findOneAndUpdate({ email },{ ...rest, email: newEmail }, { runValidators: true, new: true });

        user.password = password || user.password;

        user.save({ validateBeforeSave: false, validateModifiedOnly: true });

        res.status(200).json({
            status: true,
            data: user
        });
    } catch (error) {
        console.log(error);

        if (error.message.toLowerCase().includes('validation')) return BadRequest(res, error.message);

        return BrokenCode(res);
    }
}

exports.deleteMe = async (req, res, next) => {
    try {
        const { username } = req.user;

        const user = await User.findOneAndRemove({ username });

        res.status(204).json({
            status: true
        })
    } catch (error) {
        console.log(error);
        return BrokenCode(res);
    }
}