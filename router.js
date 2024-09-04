import { Router } from "express";
import UserController from "./controller/UserController.js";
import { mustChangePass } from "./middleware/mustChangePass.js";
import { checkAuth } from "./middleware/checkAuth.js";
import { checkRole } from "./middleware/checkRole.js";




export const router = new Router()
router.get("/admin/:id", checkRole("ADMIN") )
router.get("/users", UserController.getUsers)
router.get("/user/:id",  UserController.getOneUser)
router.post("/register", UserController.createUser)
router.post("/login", checkAuth, UserController.login)
router.delete("/user/delete-account/:id", checkAuth, UserController.deleteUser)
router.post("/user/change-email", UserController.updateUserInfo)
router.post("/user/change-password", mustChangePass, UserController.updatePassword)


