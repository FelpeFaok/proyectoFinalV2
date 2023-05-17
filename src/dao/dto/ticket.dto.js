export default class TicketDTO {
    constructor(ticket){
        this.code = ticket.code
        this.purchase_date = ticket.date
        this.amount = ticket.amount
        this.purchaser = ticket.email
    }
}