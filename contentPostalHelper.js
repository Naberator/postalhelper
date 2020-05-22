const EN_KEYWORDS = ["Postal Code", "Post Code", "Postal", "Post"];
const HE_KEYWORDS = ["מיקוד"];
const POPUP_DIV = "<div class='PostalHelperPopupBox-202012'>CODE</div>";

function wordInPage(keyword){
    return (document.documentElement.textContent || document.documentElement.innerText).indexOf(keyword) > -1;
}

function dictionary() {
    return EN_KEYWORDS.concat(HE_KEYWORDS);
}

function getPopupBox(code) {
    return POPUP_DIV.replace("CODE", code)
}

function getPostalCode() {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition((position) => google.maps.GeoCoder().geoCode(
            {
                "latLng": new google.maps.LatLng(position.coords.latitude, position.coords.altitude),
            },
            (res, status) => {
                return res[0].formatted_address.match(/, \s\w{2}\s(\d{7})/);
            }
        ));
    }
}

function popHelper() {
    let postalCode = getPostalCode();
    let popupbox = getPopupBox(postalCode);

    document.getElementById("parentID").innerHTML += popupbox;
}

if (dictionary().some((keyword) => wordInPage(keyword))) {
    console.log("Found the word %s on page. popping PostalHelper", keyword);
    popHelper();
}




