import UserModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'

const genertedRefreshToken = async(userId)=>{
    try {
        console.log('=== GENERATING REFRESH TOKEN ===');
        console.log('UserId:', userId);
        console.log('SECRET_KEY_REFRESH_TOKEN exists:', !!process.env.SECRET_KEY_REFRESH_TOKEN);
        
        if (!userId) {
            throw new Error('UserId is required for refresh token generation');
        }
        
        if (!process.env.SECRET_KEY_REFRESH_TOKEN) {
            throw new Error('SECRET_KEY_REFRESH_TOKEN environment variable is missing');
        }
        
        const token = await jwt.sign({ _id : userId},
            process.env.SECRET_KEY_REFRESH_TOKEN,
            { expiresIn : '7d'}
        )
        
        console.log('Refresh token generated, length:', token?.length);
        console.log('Token format valid:', token?.split('.').length === 3);
        
        const updateRefreshTokenUser = await UserModel.updateOne(
            { _id : userId},
            {
                refresh_token : token
            }
        )
        
        console.log('Refresh token saved to database');
        return token
    } catch (error) {
        console.error('=== REFRESH TOKEN GENERATION ERROR ===');
        console.error('Error:', error.message);
        throw error;
    }
}

export default genertedRefreshToken