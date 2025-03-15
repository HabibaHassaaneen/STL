// pages/api/auth/me.js
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

export default async function handler(req, res) {
  // Initialize the cookies object
  const cookies = new Cookies(req, res);

  // Get the token from cookies
  const token = cookies.get('token');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user data from the database
    const user = await getUserById(decoded.userId); // Replace with your logic

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}