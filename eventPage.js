import {POSTAL_COMMAND_MSG} from "./CONST";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === POSTAL_COMMAND_MSG) {
        let location = navigator.geolocation;

        if (location) {
            if (location) {
                location.getCurrentPosition((position => {
                    new maps.GeoCoder().geoCode(
                        {
                            "latLng": new google.maps.LatLng(location.coords.latitude, position.coords.altitude),
                        },
                        (res, status) => sendResponse(({
                            "postalCode": res[0].formatted_address.match(/, \s\w{2}\s(\d{7})/)
                        }))
                );}))
            }
        }
    }
});
