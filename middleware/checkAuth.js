


export function checkAuth(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
        try {
            const auth = req.headers.auth
            if (auth !== "true") {
                res.status(401).json({ message: "Unautorized" })
            }
            else next()
        }

    
    catch (err) {
        res.status(401).json({ message: "Unautorized" })
    }
}