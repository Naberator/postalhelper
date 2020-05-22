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

function popHelper() {
    chrome.runtime.sendMessage(
        {
            command: "POSTAL_CODE",
            function (postalCode) {
                document.getElementById("parentID").innerHTML += getPopupBox(postalCode);
            }
        });
}

if (dictionary().some((keyword) => wordInPage(keyword))) {
    console.log("Found the word postal reference on page. popping PostalHelper");
    popHelper();
}