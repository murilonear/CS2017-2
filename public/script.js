
var newUser = new User();

$(document).ready(() => {

    function clickButton(event) {
        console.log(event);
    }

    $('#btn_cars_hrv').click((event) => {
        console.log($);
        $.get({
            url: "/api/v1/car",
            success: function (result) {
                console.log(result.car);
                return(result.car);
                // $(this).html(result);
            }
        });
    })

    $('#btn_cars_onix').click((event) => {
        $.get({
            url: "/api/v2/car",
            success: function (result) {
                console.log(result.car);
                return(result.car);
            }
        });
    })
})