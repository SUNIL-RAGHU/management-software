import { jwtVerify } from "jose";


interface UserJwtPayload {
    jti: string //jwt id
    iat: number //issuedat
  }

export function getJwtSecretKey():string{
    const secret=process.env.JWT_SECRET_KEY

    if(!secret || secret.length===0){

        throw new Error("The environment variable is for JWT secret key is not set")
    }
    else{
        return secret;
    }

    
}

export const verifyAuth = async (token: string) => {
    try {
      const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
      return verified.payload as UserJwtPayload
    } catch (err) {
      throw new Error('Your token has expired.')
    }
  }