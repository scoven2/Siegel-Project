$(document).ready(() => {

    let cleanedCarts;

    let user = $.get('/api/user_data').then(function(data) {
        console.log('user.email: ', data.email);
        console.log('user.id: ', data.id);
        return data;
    });


    $(document).on('click', (event) => {
        if ($(event.target).attr('id') === 'continueBrowsing') {
            window.location.href = '/browse'
        }

        if ($(event.target).attr('id') === 'purchaseHistory') {
            $('#purchaseDiv').toggle();
        }

        if ($(event.target).attr('id') === 'confirmPurchase') {

            $.get('/api/user_data').then(function(data) {
                console.log('user.email: ', data.email);
                console.log('user.id: ', data.id);

                cleanedCarts.forEach((cart) => {
                    Object.values(cart).forEach((cartElement) => {
                        if (typeof cartElement === 'object' && cartElement != null && cartElement[0] != undefined) {
                            $.post('api/purchsaes', {
                                UserId: data.id,
                                MovieId: cartElement[0].id
                            }, (cart_answer) => {
                                // window.location.href = '/cart';
                            });
                        }
                    });
                });

                $.ajax({
                    method: 'DELETE',
                    url: `/api/shoppingcarts/${data.id}`
                }).then((cart_answer) => {
                    console.log('Cart deleted: ', cart_answer);
                });

                $('#purchaseConfirmationModal').modal();

                $('#purchaseConfirmationModal').on('hidden.bs.modal', function(e) {
                    loadShoppingcart();
                    loadPurchases();
                    $('#purchaseDiv').show();
                    $('#confirmPurchase').hide();
                })
            });
        }
    });


    const loadShoppingcart = () => {
        console.log('loadShoppingcart()');

        $('#cartTableBody').empty();

        $.ajax({
                method: 'GET',
                url: '/api/shoppingcarts/'
            })
            .then((shoppingcarts) => {
                let total = 0;

                if (shoppingcarts.length > 0) {
                    cleanedCarts = shoppingcarts.map((shoppingcart) => {
                        return {
                            id: shoppingcart.id,
                            UserId: shoppingcart.UserId,
                            Movies: shoppingcart.Movies
                        }
                    });

                    cleanedCarts.forEach((cart) => {
                        let tr = $('<tr>');
                        let td0 = $('<td>');
                        let td1 = $('<td>');
                        let td2 = $('<td>');
                        let td3 = $('<td>');
                        let td4 = $('<td>');

                        td0.text(cart.id);
                        td1.text(cart.UserId);

                        Object.values(cart).forEach((cartElement) => {
                            if (typeof cartElement === 'object' && cartElement != null && cartElement[0] != undefined) {
                                td2.text(cartElement[0].id);
                                td3.text(cartElement[0].title);
                                td4.text(cartElement[0].price);
                                total = +parseFloat(cartElement[0].price);
                            }
                            tr.append(td0);
                            tr.append(td1);
                            tr.append(td2);
                            tr.append(td3);
                            tr.append(td4);
                        });
                        $('#cartTableBody').append(rt);
                    });

                    total = total.toFixed(2);
                    let tr = $('<tr>');
                    let td0 = $('<td>');
                    let td1 = $('<td>');
                    let td2 = $('<td>');
                    let td3 = $('<td>');
                    let td4 = $('<td>');

                    td3.text('Total');
                    td4.text(`${total}`);
                    tr.append(td0);
                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);
                    tr.append(td4);
                    $('#carTableBody').append(tr);

                } else {
                    $('#confirmPurchase').hide();
                }
            });
    }

    const loadPurchases = () => {
        $('#purchasesTableBody').empty();

        $.get('api/user_data').then(function(data) {
            console.log('user.emal: ', data.email);
            console.log('user.id ', data.id);

            $ajax({
                method: 'GET',
                url: `/api/purchese/${data.id}`
            }).then((purchases) => {

                let cleanedPurchases = purchases.map((purchase) => {
                    return {
                        id: purchase.id,
                        UserId: purchase.UserId,
                        Movies: purchase.Movies
                    }
                });

                console.log('cleanedPurchases: ', cleanedPurchases);

                cleanedPurchases.forEach((purchase) => {
                    let tr = $('<tr>');
                    let td0 = $('<td>');
                    let td1 = $('<td>');
                    let td2 = $('<td>');
                    let td3 = $('<td>');
                    let td4 = $('<td>');


                    td0.text(purchase.id);
                    td1.text(purchase.UserId);


                    Object.values(purchase).forEach((purchaseElement) => {
                        if (typeof purchaseElement === 'object' && purchaseElement != null && purchaseElement != undefined) {
                            td2.text(purchaseElement[0].id);
                            td3.text(purchaseElement[0].title);
                            td4.text(purchaseElement[0].price);
                        }
                    });

                    tr.append(td0);
                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);
                    tr.append(td4);

                    $('#purchasesTableBody').append(tr);
                });
            });
        });
    }

    const init = () => {
        loadShoppingcart();
        loadPurchases()
        $('#purchasesDiv').hide();
    }

    init();
});