import UserService from "../Service/UserService.js"


export function checkRole(role) {

   return async function authMiddleware(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const auth = req.headers.auth
        const{ id }= req.params
        console.log(id)
        const user = await UserService.findUserbyId(id)
        if (auth !== "true") {
            res.status(401).json({ message: "no auth" })
        }
        if (user.role !== role) {
            res.status(401).json({ message: "no admin" })
        }
        else { res.json("Welcome admin")
            next()}

        }
    catch (err) {
        res.status(401).json({ message: "Unautorized" })
    }
}
}