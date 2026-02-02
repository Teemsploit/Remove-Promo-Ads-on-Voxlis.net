// ==UserScript==
// @name         Remove Voxlis Ads
// @namespace    http://tampermonkey.net/
// @version      2
// @description  Remove promotional ads from Voxlis.net
// @author       Teemsploit
// @match        https://voxlis.net/*
// @grant        none
// @license      unlicense
// ==/UserScript==

(function () {
    'use strict';

    function removeAds() {
        document.querySelectorAll('.promo-header').forEach(header => {
            const wrapper = header.closest('div');
            const body = wrapper?.nextElementSibling;
            if (body && body.classList.contains('promo-body')) {
                wrapper.remove();
                body.remove();
            } else {
                wrapper?.remove();
            }
        });

        document.querySelectorAll('.promo-image').forEach(imgDiv => {
            if (imgDiv.querySelector('img[src*="Affiliate_Banner.png"]')) {
                imgDiv.remove();
            }
        });

        document.querySelectorAll('.ad-cntnt, .banner-content, .ad-bdy').forEach(el => el.remove());

        document.querySelectorAll('.ad-hdr').forEach(hdr => {
            const next = hdr.nextElementSibling;
            hdr.remove();
            if (next && (next.classList.contains('promo-body') ||
                         next.classList.contains('ad-body') ||
                         next.classList.contains('ad-bdy'))) {
                next.remove();
            }
        });

        document.querySelectorAll('.ad-spnsr, .promo-sponsor').forEach(el => el.remove());

        document.querySelectorAll('img.sponsored-image[src*="/assets/ads/"]').forEach(img => {
            const card = img.closest('div.bg-surface\\/40');
            card?.remove();
        });

        document.querySelectorAll('div').forEach(div => {
            if (
                div.textContent?.trim() === 'Sponsored' &&
                div.parentElement?.querySelector('img.sponsored-image')
            ) {
                div.parentElement.remove();
            }
        });
    }

    window.addEventListener('load', removeAds);
    const observer = new MutationObserver(removeAds);
    observer.observe(document.body, { childList: true, subtree: true });
})();
