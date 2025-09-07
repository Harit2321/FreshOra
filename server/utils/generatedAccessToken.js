import jwt from 'jsonwebtoken'

const generatedAccessToken = async(userId)=>{
    try {
        console.log('=== GENERATING ACCESS TOKEN ===');
        console.log('UserId received:', userId);
        console.log('SECRET_KEY_ACCESS_TOKEN exists:', !!process.env.SECRET_KEY_ACCESS_TOKEN);
        
        if (!userId) {
            throw new Error('UserId is required for token generation');
        }
        
        if (!process.env.SECRET_KEY_ACCESS_TOKEN) {
            throw new Error('SECRET_KEY_ACCESS_TOKEN environment variable is missing');
        }
        
        const token = await jwt.sign({ id : userId},
            process.env.SECRET_KEY_ACCESS_TOKEN,
            { expiresIn : '5h'}
        )
        
        console.log('Access token generated successfully');
        return token
    } catch (error) {
        console.error('=== ACCESS TOKEN GENERATION ERROR ===');
        console.error('Error:', error.message);
        throw error;
    }
}

export default generatedAccessToken