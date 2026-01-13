window.addEventListener("load", () => {
    const polling = setInterval(() => {
        const inputList = document.querySelectorAll(".wishlist-card input[type='number']");
        if (inputList.length) {
            clearInterval(polling);
            inputList.forEach(input => {
                input.removeAttribute("readonly");
            });
        }
    }, 100);
});