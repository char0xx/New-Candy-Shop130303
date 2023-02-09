class Candy {
    constructor(flavor, price) {
        this.flavor = flavor;
        this.price = price;
    }
}

class Customer {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

class Order {
    constructor(name, orderDetails) {
        this.id = name;
        this.date = new Date();
        this.order = orderDetails;
    }

    getTotal() {
        let total = 0;
        for (let orderDetail of this.order) {
            const candyType = orderDetail.candyType;
            const candyCount = orderDetail.candyCount;
            total += candyType.price * candyCount;
        }
        return total;
    }
}

class CandyShop {
    constructor() {
        this.orders = {}; // Using an object in this case for O(1) time complexity, if array was used it would have to search through the entire thing then making it a O(n) time complexity
    }

    sell(order) {
        this.orders[order.id] = {...order, total: order.getTotal()};
        console.log(this.orders);
    }

    lookupOrder(name) {
        const invoice = document.getElementById("invoice-lookup-portion");
        const order = this.orders[name];

        let item = '';
        for (const orderDasddafsdsad of order.orderDetails) {
            item += `${orderDasddafsdsad.candyCount} ${orderDasddafsdsad.candyType.flavor} Candy<br/>`;
        }

        invoice.innerHTML = `
        Name: ${order.id}<br/>
        Date: ${order.date}<br/>
        ${item} <br/>
        Total: $${order.total}
        `
    }
}

const shop = new CandyShop();
const chocolate = new Candy('Chocolate', 2);
const caramel = new Candy('Caramel', 1);

function handleSubmit() {
    const form = document.getElementById('form-primary-form-portion');
    const data = Object.fromEntries(new FormData(form).entries());
    const firstName = data['firstname'];
    const lastName = data['lastname'];
    const chocolateCount = Number(data['chocolatecount']);
    const caramelCount = Number(data['caramelcount']);

    const customer = new Customer(firstName, lastName);
    const orderDetails = [
        {candyType: chocolate, candyCount: chocolateCount},
        {candyType: caramel, candyCount: caramelCount}
    ];

    form.reset();

    const order = new Order(customer.fullName(), orderDetails);
    shop.sell(order);

    let table = `<tr>
    <th>Customer</th>
    <th>Order Total</th>
    </tr>`;

    for (const order of Object.values(shop.orders)) {
        table += makeTableRow(order.id, order.total);
    }

    function makeTableRow(customer, totalAmount) {
        return `<tr>
        <td>${customer}</td>
        <td>$${totalAmount}</td>
        </tr>`
    }

    document.getElementById('order-table').innerHTML = table;
}


function handleSearch() {
    const name = document.getElementById('inputname-lookup-portion').value;
    shop.lookupOrder(name);
}