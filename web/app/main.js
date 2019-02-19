const handler = StripeCheckout.configure({
    key: 'pk_test_pIsbCWi9hua5DAc1GcPxlxPc',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
        fetch('/', {
            body: JSON.stringify({
                email: token.email,
                token: token.id,
                fullName: $("#name")[0].value,
                membership: $("#membership")[0].value,
                plusOne: $("#plusOne")[0].value,
                additional: $("#additional")[0].value
            }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            credentials: 'same-origin'
        }).then(function (status) {
            const response = $('#response')[0];
            if (!status.ok) {
                response.innerText = 'Unknown error occurred';
                response.className = 'center-align canceled';
            } else {
                response.innerText = 'Thank you for your purchase!';
                response.className = 'center-align completed';
            }
        }).catch(function () {
            const response = $('#response')[0];
            response.innerText = 'Unknown error occurred';
            response.className = 'center-align canceled';
        });
    }
});

$(function() {
    function disable() {
        const name = $("#name")[0];
        const membership = $("#membership")[0];

        return !name.value || !membership.value;
    }

    const purchase = $("#purchase");
    if (disable() && !purchase.hasClass("disabled")) {
        (purchase.addClass("disabled"));
    }

    $('.parallax').parallax();

    $("#name,#membership").change(function (event) {
        const purchase = $("#purchase");
        if (!event.target.value) {
            if (!purchase.hasClass("disabled")) {
                (purchase.addClass("disabled"));
            }
        } else {
            if (purchase.hasClass("disabled") && !disable()) {
                (purchase.removeClass("disabled"));
            }
        }
    });

    $("#purchase").click(function (event) {
        event.preventDefault();
        const id = $("#membership");
        const name = $("#name");

        let valid = true;

        if (!name[0].value) {
            valid = false;
            name.addClass("invalid");
        }

        const membershipId = id[0].value;
        if (membershipId && isNaN(parseInt(membershipId))) {
            valid = false;
            id.addClass("invalid");
        }

        if (valid) {
            const plusOne = $("#plusOne")[0].value;
            handler.open({
                name: "UBC Anime Club",
                description: `UBCAni Spring Gala 2019 RSVP${plusOne ? " (+1)" : ""}`,
                currency: "cad",
                amount: plusOne ? 1100 : 550
            });
        }
    });
});

window.addEventListener("popstate", function () {
    handler.close();
});
