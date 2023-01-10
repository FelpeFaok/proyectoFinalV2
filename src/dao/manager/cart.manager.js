import fs from 'fs'

class CartManager {

    constructor(path){
        this.path = path
    }

    read = async () => {
        if (fs.existsSync(this.path)){
            return fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r))
        }

        return []
    }

    getNextId = (list) => {
        const count = list.length
        return (count > 0) ? list[count-1].id +1 : 1
    }

    write = (list) => {
        return fs.promises.writeFile(this.path, JSON.stringify(list))
        }

    get = async () => {
        const data = await this.read()

        return data
            
        }
    getByID = async (id) => {
        const data = await this.read()
    
        return data.find(p => p.id == id)
                
        }
// se crea el carrito en caso de no existir 
    create = async () => {
        const carts = await this.read()
        const nextID = this.getNextId(carts)

        const newCart = {
            id: nextID,
            products: []
        }
        carts.push(newCart)
        
        await this.write(carts)

        return newCart
    } 

    update = async (id, obj) => {
        obj.id = id
        const list = await this.read()

        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id){
                list[i] = obj
                break
            }
        }

        await this.write(list)
    }
    // agregar producto y en caso de existir le suma uno
    addProduct = async (cardID, productID) => {

        const cart = await this.getByID(cardID)

        let found = false
        for (let i = 0; i < cart.products.length; i++) {
            if(cart.products[i].id == productID){
                cart.products[i].quantity++

                found = true
                break
            }
        }

        if(!found){
            cart.products.push({id: productID, quantity: 1})
        }

        await this.update(cardID, cart)

        return cart
    }

}

export default CartManager 