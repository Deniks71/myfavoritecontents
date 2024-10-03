import jwt from 'jsonwebtoken';

export async function checkToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!authHeader) {
        return res.status(401).json({msg: "Token invalido"})
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);

        const decoded = jwt.verify(token, secret);
        const userIdFromToken = decoded.id;
        const stringUserIdFromToken = String(userIdFromToken)
        const idParametroReq = req.params.id;

        if (stringUserIdFromToken !== idParametroReq) {
            console.log('Tipo de userIdFromToken:', typeof userIdFromToken);
            console.log('Tipo de idParametroReq:', typeof idParametroReq);
            console.log('erro no id', userIdFromToken)
            console.log('ideparametroreq', idParametroReq)
            res.status(400).json({msg: "Token Invalido!"})
        }
        
        next();
        

    } catch(err) {
        res.status(400).json({msg: "Token Invalido!"})
    }
};
