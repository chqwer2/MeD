function imageZoom(imgID1, resultID1, imgID2, resultID2) {
    var img1, img2, lens1, lens2, result1, result2, cx1, cy1, cx2, cy2;

    img1 = document.getElementById(imgID1);
    img2 = document.getElementById(imgID2);
    result1 = document.getElementById(resultID1);
    result2 = document.getElementById(resultID2);

    lens1 = document.createElement("DIV");
    lens2 = document.createElement("DIV");
    lens1.setAttribute("class", "img-zoom-lens");
    lens2.setAttribute("class", "img-zoom-lens");
    img1.parentElement.insertBefore(lens1, img1);
    img2.parentElement.insertBefore(lens2, img2);

    cx1 = result1.offsetWidth / lens1.offsetWidth;
    cy1 = result1.offsetHeight / lens1.offsetHeight;
    cx2 = result2.offsetWidth / lens2.offsetWidth;
    cy2 = result2.offsetHeight / lens2.offsetHeight;

    result1.style.backgroundImage = "url('" + img1.src + "')";
    result1.style.backgroundSize = (img1.width * cx1) + "px " + (img1.height * cy1) + "px";

    result2.style.backgroundImage = "url('" + img2.src + "')";
    result2.style.backgroundSize = (img2.width * cx2) + "px " + (img2.height * cy2) + "px";

    lens1.addEventListener("mousemove", moveLens);
    img1.addEventListener("mousemove", moveLens);

    lens2.addEventListener("mousemove", moveLens);
    img2.addEventListener("mousemove", moveLens);

    lens1.addEventListener("touchmove", moveLens);
    img1.addEventListener("touchmove", moveLens);

    lens2.addEventListener("touchmove", moveLens);
    img2.addEventListener("touchmove", moveLens);

    function moveLens(e) {
        var pos, x, y;
        e.preventDefault();

        // Depending on which lens is being moved, get the appropriate cursor position.
        if (e.target === lens1 || e.target === img1) {
            pos = getCursorPos(e, img1);
        } else {
            pos = getCursorPos(e, img2);
        }

        x = pos.x - (lens1.offsetWidth / 2);
        y = pos.y - (lens1.offsetHeight / 2);

        if (x > img1.width - lens1.offsetWidth) {x = img1.width - lens1.offsetWidth;}
        if (x < 0) {x = 0;}
        if (y > img1.height - lens1.offsetHeight) {y = img1.height - lens1.offsetHeight;}
        if (y < 0) {y = 0;}

        lens1.style.left = x + "px";
        lens1.style.top = y + "px";
        lens2.style.left = x + "px";
        lens2.style.top = y + "px";
        result1.style.backgroundPosition = "-" + (x * cx1) + "px -" + (y * cy1) + "px";
        result2.style.backgroundPosition = "-" + (x * cx2) + "px -" + (y * cy2) + "px";
    }

    function getCursorPos(e, img) {
        var a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }
}
