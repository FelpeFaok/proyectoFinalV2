import ticketModel from './models/ticket.model.js'

export default class Ticket {
    constructor(){ }

    getAll = async()=>{
        try {
            const tickets = await ticketModel.find().lean().exec();
            return tickets;
        } catch (error) {
            console.log('Error al obtener usuarios: ' + error);
        }
    }

    getOne = async(id) =>{
        try {
            const ticket = await ticketModel.findById(id).lean().exec();
            return ticket;
        } catch (error) {
            console.log('Error al obtener el usuario');
        }
    }

    create = async(ticket)=>{
        try {
            const result = await ticketModel.create(ticket);
            return result;
        } catch (error) {
            console.log('Error al crear ticket: ' + error);
        }
    }
}