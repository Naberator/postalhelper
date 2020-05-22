chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "POSTAL_CODE") {
        let location = navigator.geolocation;

        if (location) {
                location.getCurrentPosition((position => {
                    new google.maps.GeoCoder().geoCode(
                        {
                            "latLng": new google.maps.LatLng(location.coords.latitude, position.coords.altitude),
                        },
                        (res, status) => sendResponse(({
                            "postalCode": res[0].formatted_address.match(/, \s\w{2}\s(\d{7})/)
                        }))
                    );
                }))
            }
        }
});
