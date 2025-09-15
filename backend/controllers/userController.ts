import User from '../models/User';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.json({ message: 'Get all users', data: users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const createUser = async (req: any, res: any) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });
    
    const savedUser = await user.save();
    
    // Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;
    
    res.status(201).json({ message: 'User created successfully', data: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const getUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, '-password'); // Exclude password field
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User fetched successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;
    
    const user = await User.findByIdAndUpdate(
      id, 
      { email, firstName, lastName },
      { new: true, select: '-password' } // Exclude password field
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User updated successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};