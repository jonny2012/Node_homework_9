import { mustChangePass } from "../middleware/mustChangePass.js"
import { User } from "../models/users.js"

 class userService{
    async getOneUser(email){
        const user = await User.findOne({where:{email}})
        return user
    }
    async findUserbyId(id){
      const user = User.findByPk(id)
      return user
  }

    async getAllUsers() {

        const users = await User.findAll();
        return users
    }
    async createUser(name,email, cryptedPassword, mustChangePassword, role){
      const user =  await User.create({name,email, password:cryptedPassword, mustChangePassword, role})
      return user
    }

      async deleteUser(userId){
        const user =  await User.destroy({where:{id:userId}})
        return user
      }

      async updateUserPassword(user, password){
        const  updatedData = await User.update({
          id:user.id,
          name:user.name, email:user.email, password,
           mustChangePassword:user.mustChangePassword},
                                                {where:{email:user.email}})
                return updatedData
      }
      async updateUserEmail(user, email){
        const  updatedData = await User.update({
          id:user.id,
          name:user.name, email, password:user.password, mustChangePassword:user.mustChangePassword},
                                                {where:{email:user.email}})
                return updatedData
      }
}

export default new userService()