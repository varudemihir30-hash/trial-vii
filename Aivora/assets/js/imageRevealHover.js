/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    const mapNumber = (X,A,B,C,D) => (X-A)*(D-C)/(B-A)+C;
    // from http://www.quirksmode.org/js/events_properties.html#position
	const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
		if (!e) e = window.event;
		if (e.pageX || e.pageY) {
            posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
        return { x : posx, y : posy }
    }
    // Generate a random float.
    const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

    /**
     * One class per effect.
     * Lots of code is repeated, so that single effects can be easily used.
     */

    // Effect 1
    class HoverImgFx1 {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.reveal = document.createElement('div');
            this.DOM.reveal.className = 'xb-img-reveal-wrapper';
            this.DOM.reveal.innerHTML =
            `<div class="xb-img-reveal-wrapper__inner">
                <div class="xb-img-reveal-wrapper__img">
                    <div class="xb-hover-wrapper">
                        <img src="${this.DOM.el.dataset.img ? this.DOM.el.dataset.img: ''}" alt="">
                    </div>
                </div>
            </div>`;
            document.body.appendChild(this.DOM.reveal);
            this.DOM.revealInner = this.DOM.reveal.querySelector('.xb-img-reveal-wrapper__inner');
            this.DOM.revealInner.style.overflow = 'hidden';
            this.DOM.revealImg = this.DOM.revealInner.querySelector('.xb-img-reveal-wrapper__img');
            
            // Set initial transform values
            if (typeof gsap !== 'undefined') {
                gsap.set(this.DOM.revealInner, {x: '-100%'});
                gsap.set(this.DOM.revealImg, {x: '100%'});
            } else {
                this.DOM.revealInner.style.transform = 'translateX(-100%)';
                this.DOM.revealImg.style.transform = 'translateX(100%)';
            }

            this.initEvents();
        }
        initEvents() {
            this.positionElement = (ev) => {
                const mousePos = getMousePos(ev);
                // Use pageX/pageY directly for fixed positioning
                const x = ev.pageX !== undefined ? ev.pageX : (ev.clientX + window.scrollX);
                const y = ev.pageY !== undefined ? ev.pageY : (ev.clientY + window.scrollY);
                
                this.DOM.reveal.style.top = `${y + 20}px`;
                this.DOM.reveal.style.left = `${x + 20}px`;
            };
            this.mouseenterFn = (ev) => {
                this.positionElement(ev);
                this.showImage();
            };
            this.mousemoveFn = ev => {
                requestAnimationFrame(() => {
                    this.positionElement(ev);
                });
            };
            this.mouseleaveFn = () => {
                this.hideImage();
            };

            this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
            this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
            this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
        }
        showImage() {
            // Use GSAP 3 if available, fallback to CSS transitions
            if (typeof gsap !== 'undefined') {
                gsap.killTweensOf([this.DOM.revealInner, this.DOM.revealImg]);
                
                this.tl = gsap.timeline({
                    onStart: () => {
                        this.DOM.reveal.style.opacity = 1;
                        gsap.set(this.DOM.el, {zIndex: 9});
                    }
                });
                
                gsap.set(this.DOM.revealInner, {x: '-100%'});
                gsap.set(this.DOM.revealImg, {x: '100%'});
                
                this.tl
                    .to(this.DOM.revealInner, {
                        x: '0%',
                        duration: 0.2,
                        ease: 'sine.out'
                    }, 0)
                    .to(this.DOM.revealImg, {
                        x: '0%',
                        duration: 0.2,
                        ease: 'sine.out'
                    }, 0);
            } else {
                // Fallback to CSS transitions
                this.DOM.reveal.style.opacity = 1;
                this.DOM.revealInner.style.transform = 'translateX(0)';
                this.DOM.revealImg.style.transform = 'translateX(0)';
            }
        }
        hideImage() {
            // Use GSAP 3 if available, fallback to CSS transitions
            if (typeof gsap !== 'undefined') {
                gsap.killTweensOf([this.DOM.revealInner, this.DOM.revealImg]);
                
                this.tl = gsap.timeline({
                    onStart: () => {
                        gsap.set(this.DOM.el, {zIndex: 8});
                    },
                    onComplete: () => {
                        gsap.set(this.DOM.el, {zIndex: ''});
                        gsap.set(this.DOM.reveal, {opacity: 0});
                    }
                });
                
                this.tl
                    .to(this.DOM.revealInner, {
                        x: '100%',
                        duration: 0.2,
                        ease: 'sine.out'
                    }, 0)
                    .to(this.DOM.revealImg, {
                        x: '-100%',
                        duration: 0.2,
                        ease: 'sine.out'
                    }, 0);
            } else {
                // Fallback to CSS transitions
                this.DOM.revealInner.style.transform = 'translateX(100%)';
                this.DOM.revealImg.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    this.DOM.reveal.style.opacity = 0;
                }, 200);
            }
        }
    }

    // Initialize image reveal effects when DOM is ready
    function initImageReveal() {
        // Check if HoverPTCard1 is defined
        if (typeof HoverPTCard1 !== 'undefined') {
            [...document.querySelectorAll('[data-fx="pt1"] > .xb-img-reveal-item, .xb-img-reveal-item[data-fx="pt1"]')].forEach(link => new HoverPTCard1(link));
        }
        // Initialize HoverImgFx1 for team items and other elements
        const items = document.querySelectorAll('[data-fx="1"] > .xb-img-reveal-item, .xb-img-reveal-item[data-fx="1"]');
        items.forEach(link => {
            try {
                new HoverImgFx1(link);
            } catch (e) {
                console.error('Error initializing image reveal:', e);
            }
        });
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImageReveal);
    } else {
        // DOM already loaded, initialize immediately
        setTimeout(initImageReveal, 100);
    }

    const contentel = document.querySelector('.content');
    [...document.querySelectorAll('.block__title, .block__link, .content__text-link')].forEach((el) => {
        const imgsArr = el.dataset.img.split(',');
        const imgsSubtitle = el.dataset.subtitle.split(',');
        const imgsTitle = el.dataset.title.split(',');
        const imgsDate = el.dataset.metadate.split(',');
        const imgsAuthor = el.dataset.metaauthor.split(',');
        for (let i = 0, len = imgsArr.length; i <= len-1; ++i ) {
            const imgel = document.createElement('img');
            imgel.style.visibility = 'hidden';
            imgel.style.width = 0;
            imgel.src = imgsArr[i];
            imgel.className = 'preload';
            contentel.appendChild(imgel);
        }
    });
}
