const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { 
    type: String, 
    required: [true, 'First name is required!'] 
  },

  last_name: { 
    type: String, 
    required: [true, 'Last name is required!'] 
  },

  email: {
    type: String,
    unique: [true, 'email exists!'],
    required: [true, 'email is required!'] 
  },

  password: {
    type: String,
    required: [true, 'password is required!']
  }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

UserSchema.pre('save', async function(next) {

    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }

    
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
