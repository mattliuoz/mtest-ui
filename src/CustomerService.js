export const getCustomers = query => {
    if (query) {
        query = `?${query}`;
    }
    return fetch(`${process.env.REACT_APP_CUSTOMERS_SERVICE_URI}/api/customers${query}`)
        .then(response =>
            response.json()
                .then(data => ({
                    data: data,
                    status: response.status
                })

                ))
        .then(response => {
            if (response.status >= 200 && response.status <= 300) {
                const data = response.data.items.map(d => {
                    d.key = d.id;
                    d.name = `${d.firstName} ${d.lastName}`;
                    const dob = new Date(d.dob);
                    d.dob = dob.toLocaleDateString("en-GB");
                    return d;
                });

                return { isSuccess: true, data: data };
            }
            else {
                return { isSuccess: false, data: response.data };
            }

        });
};

export const addCustomer = values => {
    return fetch(`${process.env.REACT_APP_CUSTOMERS_SERVICE_URI}/api/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Request-Method": "POST"
        },
        redirect: "follow",
        body: JSON.stringify(values),
    }).then(response =>
        response.json()
            .then(data => ({
                data: data,
                status: response.status
            })

            )).then(response => {
                if (response.status >= 200 && response.status <= 300) {

                    var customer = response.data;
                    return {isSuccess:true, data : customer };
                    // message.success(`Customer(custCode: ${customer.custCode}) is added`, 10);
                    // this.refreshList();
                }
                else {
                    const error = response.data;
                    return {isSuccess:false, data : error };
                    //message.error(`Failed to add customer: ${error.errorMessage}`);
                }
            }
            );
}

export default getCustomers;