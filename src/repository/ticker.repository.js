import TicketDTO from "../dao/dto/ticket.dto.js";
import {v4 as uuidv4 } from 'uuid'

export default class TicketRepository {
    constructor(dao){
        this.dao = dao
    }

    getAll = async()=>{
        try {
            return await this.dao.getAll()
        } catch (error) {
            console.log('Error obteniedo el servicio'+ error);
        }
    }

    getOne = async(id)=>{
        try {
            return await this.dao.getOne(id)
        } catch (error) {
            console.log('Ticket no encontrado');
        }
    }

    create = async(email, amount)=>{
        try {
            const ticketInsert = new TicketDTO({
                email: email,
                amount: amount,
                code: uuidv4(),
                date: new Date(Date.now())
            })
            return await this.dao.create(ticketInsert)
        } catch (error) {
            console.log('No se pudo crear ticket');
        }
    }
}