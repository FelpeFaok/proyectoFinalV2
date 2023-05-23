import  { Product, Cart, User, Message, Ticket } from '../dao/factory.js'

import ProductRepository from '../repository/products.repository.js'
import CartRepository from '../repository/cart.repository.js'
import UserRepository from '../repository/users.repository.js'
import MessageRepository from '../repository/messages.repository.js'
import TicketRepository from '../repository/ticker.repository.js'
import Mocking from '../dao/mocking/products.mock.js';

export const ProductService = new ProductRepository(new Product())
export const CartService = new CartRepository(new Cart())
export const UserService = new UserRepository(new User())
export const MessageService = new MessageRepository(new Message())
export const TicketService = new TicketRepository(new Ticket())
export const MockService = new Mocking(100);