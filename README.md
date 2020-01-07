# Busi

Customer object: {
    id (int): auto-generated,
    name (string): user-defined, not null
}

Sales order object: {
    id (int): auto-generated,
    customer_id (int): user-defined, not null,
    description (string): user-defined, not null,
    amount (decimal): user-defined, not null
}

Invoice object: {
    id (int): auto-generated,
    salesorder_id (int): user-defined, not null,
    amount paid (decimal): calculated,
    discount (decimal): default zero,
    amount remaining (decimal): calculated,
    paid (boolean): default false, calculated
}

Payment object: {
    id (int): auto-generated,
    invoice_id (int): user-defined, not null
    amount (decimal): user-defined, not null
}

Routes to send to back end:
The directions are intended as follows: what type of request to make, the query url, and information about what object to send in the req body if applicable

View all customers: GET, "/api/customers"
View specific customer: GET, "/api/customers/" + id
Edit customer name: PUT, "/api/customers/" + id; send an object with key "name": new name
Delete customer: DELETE, "/api/customers/" + id
Add customer: POST, "/api/customers"; send an object with key "name": customer name

View all sales orders: GET, "/api/salesorders"
View specific sales order: GET, "/api/salesorders/" + id
Edit sales order: PUT, "/api/salesorders/" + id; send an object with keys you want to be changed
Delete sales order: DELETE, "/api/salesorders/" + id
Create sales order: POST, "/api/salesorders"; send an object with keys customer_id, description, and amount

View all invoices: GET, "/api/invoices"
View specific invoice: GET, "/api/invoices/" + id
Edit invoice: PUT, "/api/invoices/" + id; send an object with keys salesorder_id and/or discount
Delete invoice: DELETE, "/api/invoices/" + id
Create invoice: POST, "/api/invoices"; send an object with keys salesorder_id and amount, and discount if applicable

View all payments: GET, "/api/payments"
View specific payment: GET, "/api/payments/" + id
Edit payment: PUT, "/api/payments/" + id; send an object with keys invoice_id and/or amount
Delete payment: DELETE, "api/payments/" + id
Create payment: POST, "api/payments"; send an object with keys invoice_id and amount