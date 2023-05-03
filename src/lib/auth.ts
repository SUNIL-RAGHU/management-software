

export function getJwtSecretKey():string{
    const secret=process.env.JWT_SECRET_KEY

    if(!secret || secret.length===0){

        throw new Error("The environment variable is for JWT secret key is not set")
    }
    else{
        return secret;
    }
}