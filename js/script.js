document.addEventListener("DOMContentLoaded", function () {
    // Get the slider element
    const slider = document.getElementById("slider");
    const sliderInner = document.querySelector(".slider-inner");
    const footerInnerDiv = document.getElementById("footerImgBox");
    const footerDiv = document.getElementById("footerImg");
    let offset2 = 0;

    // Get all the images within the slider
    let images = slider.querySelectorAll("img");
    for (let i = 0; i < 100; i++) {
        images.forEach((img, i) => {
            sliderInner.appendChild(img.cloneNode(true));
        });
    }

    images.forEach(function (item) {
        footerInnerDiv.appendChild(item.cloneNode(true));
    });

    images = slider.querySelectorAll("img");
    let targetIndex = Math.floor(images.length / 2);

    const footerImg = footerInnerDiv.querySelectorAll("img");
    footerImg.forEach(function (item, i) {
        i !== targetIndex % footerImg.length
            ? item.classList.add("hidden")
            : item.classList.remove("hidden");
    });

    let initialOffset =
        slider.offsetWidth / 2 -
        images[targetIndex].offsetWidth / 2 -
        images[targetIndex].offsetLeft;
    let initialOffset2 =
        slider.offsetWidth / 2 -
        images[targetIndex % footerImg.length].offsetWidth / 2 -
        images[targetIndex % footerImg.length].offsetLeft;
    images.forEach((img, i) => {
        img.style.transform = `translateX(${initialOffset}px)`;
    });

    images.forEach((image) => {
        image.addEventListener("click", (event) => {
            images.forEach((img) => img.classList.remove("active"));

            event.target.classList.add("active");
            targetIndex = Array.from(images).indexOf(event.target);

            const left = slider.offsetWidth / 2 - event.target.offsetWidth / 2;
            let offset = left - event.target.offsetLeft;

            let targetFooter = footerImg[targetIndex % footerImg.length];
            let rect = targetFooter.getBoundingClientRect();
            let offsetLeft = Math.floor(rect.left);

            let left2 = Math.max(footerInnerDiv.offsetLeft, offsetLeft);
            left2 = Math.min(
                left2,
                footerInnerDiv.offsetLeft + footerInnerDiv.offsetWidth
            );

            if (offsetLeft > left2) {
                offset2 =
                    left2 - targetFooter.offsetLeft - targetFooter.offsetWidth;
            } else if (offsetLeft < left2) {
                offset2 = left2 - targetFooter.offsetLeft;
            }

            footerImg.forEach((img) => {
                img.style.transform = `translateX(${offset2}px)`;
            });

            images.forEach((img, i) => {
                img.style.transform = `translateX(${offset}px)`;
            });

            footerImg.forEach((img, i) => {
                if (i === targetIndex % footerImg.length) {
                    img.classList.remove("hidden");
                } else {
                    img.classList.add("hidden");
                }
            });
        });
    });

    footerImg.forEach((image, idx) => {
        image.addEventListener("click", (event) => {
            footerImg.forEach((img) => img.classList.add("hidden"));
            event.target.classList.remove("hidden");
            let targetIndex2 = Array.from(footerImg).indexOf(event.target);

            targetIndex =
                targetIndex + targetIndex2 - (targetIndex % footerImg.length);

            const left =
                slider.offsetWidth / 2 - images[targetIndex].offsetWidth / 2;
            let offset = left - images[targetIndex].offsetLeft;

            images.forEach((img) => {
                img.style.transform = `translateX(${offset}px)`;
            });

            let targetFooter = event.target;
            let rect = targetFooter.getBoundingClientRect();
            let offsetLeft2 = Math.floor(rect.left);

            let left2 = Math.max(footerInnerDiv.offsetLeft, offsetLeft2);
            left2 = Math.min(
                left2,
                footerInnerDiv.offsetLeft + footerInnerDiv.offsetWidth
            );

            if (offsetLeft2 > left2) {
                offset2 =
                    left2 - targetFooter.offsetLeft - targetFooter.offsetWidth;
            } else if (offsetLeft2 < left2) {
                offset2 = left2 - targetFooter.offsetLeft;
            }

            footerImg.forEach((img) => {
                img.style.transform = `translateX(${offset2}px)`;
            });
        });
    });
});
