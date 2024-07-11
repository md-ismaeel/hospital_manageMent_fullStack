
const Authorization = (role) => {
    return async (req, res, next) => {
        if (role.includes(req.user.role)) {
            next()
        } else {
            res.status(403).json({
                success: false,
                message: "Forbidden",
            })
        }
    }
}
module.exports = Authorization;