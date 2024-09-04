
import { User } from "../models/users.js"
import userService from "../Service/UserService.js"
import * as bcrypt from "bcrypt"

class UserController {
    async getOneUser(req, res) {

        const email = await req.body
        if (!email) {

            res.status(500).json({ message: "Email not found" })
            return
        }
        try {
            const user = await userService.getOneUser(email)
            res.json(user)
        }
        catch (err) {
            console.error(err.message)
        }
    }

    async getOneUserbyId(req, res) {

        const { id } = await req.params
        try {
            if (!id) {
                console.log("id is not entered")
                res.status(500).json({ message: "Email not found" })
                return
            }
            const user = await userService.findUserbyId(id)
        }
        catch (err) {
            console.error("Error" + err)
        }
    }
    async getUsers(req, res) {
        try {
            const users = await userService.getAllUsers()
            res.json(users)
        }
        catch (err) {
            console.error(err.message)
        }
    }

    async createUser(req, res) {
        const { name, email, password, mustChangePassword,role } = req.body
        try {

            const user = await userService.getOneUser(email)
            if (user) {
                res.json({ message: "Email is already registered" })
                return
            }
            const cryptedpassword = await bcrypt.hash(password, 3)

            const createUser = await userService.createUser(name, email, cryptedpassword, mustChangePassword,role)
            res.json(createUser)
        }
        catch (err) {
            console.log(err.stack)
        }
    }
    async adminRole(req,res){
        try {
            const { name, email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (user) {
                const passwordValid = await bcrypt.compare(password, user.password)
                if (passwordValid) res.json("login successfull")
                else res.json("wrong password")

            } else res.json("worng email")


        }
        catch (err) {
            res.json(err.message)
        } 
    }

    async login(req, res) {

        try {
            const { name, email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (user) {
                const passwordValid = await bcrypt.compare(password, user.password)
                if (passwordValid) res.json("login successfull")
                else res.json("wrong password")

            } else res.json("worng email")


        }
        catch (err) {
            res.json(err.message)
        }
    }

    async deleteUser(req, res) {
        const {id} = req.params
        const {password }= req.body
        if (!id) {
            console.log("Wrong id")
            return
        }
        try {
            const user = await userService.findUserbyId(id)
            if (!user) res.json("user not found")
            const passwordValid = await bcrypt.compare(password, user.password)
            if (!passwordValid) res.json("Wrong Password")
            const rowsDeleted = await userService.deleteUser(id)
            if (rowsDeleted > 0) res.json({ message: "User is deleted successfully" })
            else res.json({ message: "Something goes wrong" })
        }
        catch (err) {
            console.log(err.stack)
        }
    }
    async updateUserInfo(req, res) {
        const {email, newEmail,  password } =  req.body

   

        try {
            const user = await userService.getOneUser(email)
            if (!user) {
                res.json({ message: "Wrong email" })
                return
            }
            const passwordValid = await bcrypt.compare(password, user.password)
            if (!passwordValid) res.json("Wrong Password")
            const rowsUpdated = await userService.updateUserEmail(user, newEmail)
            if (rowsUpdated > 0) res.json({ message: "User Email info was successfull updated" })

            else res.json({ message: `Wrong data` })

        }
        catch (error) {
            console.error(error.message)
        }
    }


    async updatePassword(req, res) {

        const { email, password } = await req.body

        if (!email) {
            console.log("No userData")
            return
        }
        const user = await userService.getOneUser(email)
        if (!user) {
            res.json({ message: "Wrong email" })
            return
        }
        try {
            const cryptedpassword = await bcrypt.hash(password, 3)
            const rowsUpdated = await userService.updateUserPassword(user, cryptedpassword)
            if (rowsUpdated > 0) res.json({ message: "User password was successfull updated" })

            else res.json({ message: `Unexpected Error` })

        }
        catch (error) {
            console.error(error.message)
        }
    }

}
export default new UserController()