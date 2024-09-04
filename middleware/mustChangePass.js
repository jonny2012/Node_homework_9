

export function mustChangePass(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const {mustChangePassword} = req.body
      if(mustChangePassword) next()
    }
    catch (err) {
        res.status(401).json(err.message)
    }
}