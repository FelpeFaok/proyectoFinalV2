export default class UserDTO {

    constructor(user) {
        this.id = user.id || user._id || null
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.age = user.age
        this.password = user.password
        this.cart = user.cart
        this.role = user.role
    }
    getCurrent = ()=>{
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            role: this.role,
            age: this.age,
            cart: this.cart,
            id: this.id || this._id
        }
    }
}
