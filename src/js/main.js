document.addEventListener("DOMContentLoaded", function () {
    // mediaQuery
    const mediaQuery = window.matchMedia("(max-width: 48em)").matches;

    // advantage-main
    var sliderAdvantage = new Swiper('.advantage-slider__container', {
        slidesPerView: 'auto',
        loop: false,
        pagination: {
            el: '.advantage-slider .sl-pag__bullets, .advantage-slider .sl-pag__progressbar',
            bulletClass: 'bullet',
            bulletActiveClass: 'active',
            renderBullet: function (index, className) {
                index = index + 1;
                if (index < 10) {
                    return '<span class="' + className + '">0' + (index) + '</span>';
                }
                return '<span class="' + className + '">' + (index) + '</span>';
            },
        },
        navigation: {
            nextEl: '.advantage-slider .sl-nav__next',
            prevEl: '.advantage-slider .sl-nav__prev',
            disabledClass: 'disabled',
        },
    });

    totalSlides('.advantage-slider__container .sl-pag__total', sliderAdvantage, 0)

    if (mediaQuery && document.querySelector('.banner-bottom__slider')) {
        console.log('1')
        sliderAdvantage.destroy();
        let slider = document.querySelector('.banner-bottom__slider')
        let container = document.querySelector('.banner-bottom__slider .swiper-container')
        let wrapper = document.querySelector('.banner-bottom__slider .swiper-wrapper')
        let slide = document.querySelectorAll('.banner-bottom__slider .swiper-slide')

        container.classList.remove('advantage-slider__container')
        container.classList.remove('swiper-container')
        wrapper.classList.remove('advantage-slider__wrapper')
        wrapper.classList.remove('swiper-wrapper')
        slider.classList.remove('advantage-slider')
        slide.forEach(element => {
            element.classList.remove('swiper-slide')
            element.classList.remove('advantage-slider__slide')
        });

        toggleList(
            '.banner-bottom__slider .advantage__item', 
            '.banner-bottom__slider .advantage__bottom .btn', 
            [50, 6]
        )

    }
    // review-main
    var reviewSliderMain = new Swiper('.review--main .review__container', {
        slidesPerView: 'auto',
        loop: true,
        centeredSlides: true,
        loopedSlides: 2,
        pagination: {
            el: '.review .sl-pag__bullets, .review .sl-pag__progressbar',
            bulletClass: 'bullet',
            bulletActiveClass: 'active',
            renderBullet: function (index, className) {
                index = index + 1;
                if (index < 10) {
                    return '<span class="' + className + '">0' + (index) + '</span>';
                }
                return '<span class="' + className + '">' + (index) + '</span>';
            },
        },
        navigation: {
            nextEl: '.review .sl-nav__next',
            prevEl: '.review .sl-nav__prev',
            disabledClass: 'disabled',
        },
    });

    totalSlides('.review--main .review__container .sl-pag__total', reviewSliderMain, 4)

    // review-page
    var reviewSliderPage = new Swiper('.review--page .review__container', {
        slidesPerView: 'auto',
        loop: false,
        centeredSlides: false,
        slideActiveClass: 'active',
        pagination: {
            el: '.review .sl-pag__bullets, .review .sl-pag__progressbar',
            bulletClass: 'bullet',
            bulletActiveClass: 'active',
            renderBullet: function (index, className) {
                index = index + 1;
                if (index < 10) {
                    return '<span class="' + className + '">0' + (index) + '</span>';
                }
                return '<span class="' + className + '">' + (index) + '</span>';
            },
        },
        navigation: {
            nextEl: '.review .sl-nav__next',
            prevEl: '.review .sl-nav__prev',
            disabledClass: 'disabled',
        },
    });

    totalSlides('.review--page .review__container .sl-pag__total', reviewSliderPage, 0)
    

    // sliderAdvantage.on('init', function() { /* do something */ });
    // // init Swiper
    // sliderAdvantage.init();
    
    // certificate-main
    var slidesPerViewSliderCertificate = 'auto';
    if (mediaQuery) {
        slidesPerViewSliderCertificate = 3
    }
    var sliderCertificate = new Swiper('.certificate-slider__container', {
        slidesPerView: slidesPerViewSliderCertificate,
        loop: false,
        pagination: {
            el: '.certificate-slider .sl-pag__bullets, .certificate-slider .sl-pag__progressbar',
            bulletClass: 'bullet',
            bulletActiveClass: 'active',
            renderBullet: function (index, className) {
                index = index + 1;
                if (index < 10) {
                    return '<span class="' + className + '">0' + (index) + '</span>';
                }
                return '<span class="' + className + '">' + (index) + '</span>';
            },
        },
        navigation: {
            nextEl: '.certificate-slider .sl-nav__next',
            prevEl: '.certificate-slider .sl-nav__prev',
            disabledClass: 'disabled',
        },
    });

    totalSlides('.certificate-slider__container .sl-pag__total', sliderCertificate, 0)

    // totalSlides

    function totalSlides(el, slide, loopedSlides) {
        let totalPag = document.querySelector(el)
        if (totalPag && slide.slides.length - loopedSlides < 10) {
            totalPag.textContent = '0' + (slide.slides.length - loopedSlides)
        } else if (totalPag) {
            totalPag.textContent = (slide.slides.length - loopedSlides)
        }
    }

    // nav
    let nav = document.querySelector('.nav')
    let burger = document.querySelector('.burger')
    burger.addEventListener('click', function () {
        this.classList.toggle('active')
        nav.classList.toggle('active')
        toggleScroll('body', false)
    })
    

    // no scroll body
    function toggleScroll(el, bullet) {
        let element = document.querySelector(el)
        if (bullet) {
            element.style.overflow = 'hidden'
            return;
        }
        if (element.style.overflow == 'hidden') {
            element.style.overflow = 'visible'
        } else {
            element.style.overflow = 'hidden'
        }
    }


    // выпадающий список в меню
    let navLi = document.querySelectorAll('.nav__item');
    let url = window.location.pathname;
    if (mediaQuery) {
        navLi.forEach(element => {
            let drop = element.querySelector('.nav__drop');
            let arrow = element.querySelector('.nav__arrow');
            let href = element.querySelector('a').getAttribute('href');
            if (drop && arrow) {
                arrow.addEventListener('click', function () {
                    this.classList.toggle('active')
                    element.classList.toggle('active')
                    $(drop).slideToggle()
                });
            }
            if (href == url) {
                element.classList.add('current')
            } else {
                console.log(url, href)
            }
        });
        
        let header = document.querySelector('.header');
        let htmlDoc = document.querySelector('html');
        let lastScrollTop = 0;
        window.addEventListener('scroll', function () {
            let currentScrollTop = htmlDoc.scrollTop
            if (currentScrollTop == 0) {
                header.classList.remove('fixed')
                header.classList.remove('animate')
            } else if (currentScrollTop < lastScrollTop) {
                header.classList.add('fixed')
                header.classList.remove('animate')
            } else {
                header.classList.add('animate')
                header.classList.remove('fixed')
            }
            lastScrollTop = htmlDoc.scrollTop
        })
    } else {
        navLi.forEach(element => {
            let href = element.querySelector('a').getAttribute('href');
            if (element.querySelector('.nav__drop')) {
                element.addEventListener('mouseenter', function () {
                    navLi.forEach(item => item.classList.remove('active'))
                    this.classList.add('active')
                });
                element.addEventListener('mouseleave', function () {
                    navLi.forEach(item => item.classList.remove('active'))
                });
            }
            if (href == url) {
                element.classList.add('current')
            } else {
                console.log(url, href)
            }
        });
    }
    
    // калькулятор 
    let cost = 8000000;
    let years = 15;
    let initial_fee = 2500000;

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function numberSapceOnly(x) {
        return x.toString().replace(/([^\d\ ])/ig, "");
    }

    function numberOnly(x) {
        return x.toString().replace(/([^\d])/ig, "");
    }
    // кердит

    var optionsCost = {
        min: 500000,
        max: 50000000,
        from: 8000000,
        step: 10000,
        input: $("#rb-cost .calc__input"),
        range: $("#rb-cost .range-bar__input"),
        instance: undefined,
    }

    optionsCost.range.ionRangeSlider({
        grid: false,
        min: optionsCost.min,
        max: optionsCost.max,
        from: optionsCost.from,
        step: optionsCost.step,
        onStart: function (data) {
            cost = data.from;
            optionsCost.input.prop("value", data.from_pretty + ' ₽');
            rangeCalc()
        },
        onChange: function (data) {
            cost = data.from;
            optionsCost.input.prop("value", data.from_pretty + ' ₽');
            rangeCalc()
        },
    });

    optionsCost.input.on("input", function() {
        var val = numberOnly($(this).val());
        $(this).val(numberSapceOnly($(this).prop("value")));
        $(this).val(numberWithSpaces(val));

        if (val < optionsCost.min) {
            val = optionsCost.min;
        } else if (val > optionsCost.max) {
            val = optionsCost.max;
            optionsCost.input.prop("value", numberWithSpaces(optionsCost.max));
        }

        optionsCost.instance.update({
            from: val
        });
        cost = val;
        rangeCalc()
    });

    optionsCost.input.on('focus', function() {
        $(this).val(numberSapceOnly($(this).prop("value")));
        $(this).val(numberWithSpaces($(this).prop("value")));
    })

    optionsCost.input.on('blur', function() {
        if (numberOnly($(this).val()) < optionsCost.min) {
            optionsCost.input.prop("value", numberWithSpaces(optionsCost.min) + ' ₽');
            optionsCost.instance.update({
                from: optionsCost.min
            });
            cost = optionsCost.min;
            rangeCalc()
        } else {
            optionsCost.input.prop("value", numberWithSpaces(numberOnly($(this).val())) + ' ₽');
        }
    })

    optionsCost.instance = optionsCost.range.data("ionRangeSlider");

    // годы

    var optionsYears = {
        min: 3,
        max: 30,
        from: 15,
        step: 1,
        input: $("#rb-years .calc__input"),
        range: $("#rb-years .range-bar__input"),
        instance: undefined,
    }

    optionsYears.range.ionRangeSlider({
        grid: false,
        min: optionsYears.min,
        max: optionsYears.max,
        from: optionsYears.from,
        step: optionsYears.step,
        onStart: function (data) {
            years = data.from;
            optionsYears.input.prop("value", data.from_pretty + ' лет');
            rangeCalc()
        },
        onChange: function (data) {
            years = data.from;
            optionsYears.input.prop("value", data.from_pretty + ' лет');
            rangeCalc()
        },
    });

    optionsYears.input.on("input", function() {
        var val = numberOnly($(this).val());
        $(this).val(numberSapceOnly($(this).prop("value")));
        $(this).val(numberWithSpaces(val));

        if (val < optionsYears.min) {
            val = optionsYears.min;
        } else if (val > optionsYears.max) {
            val = optionsYears.max;
            optionsYears.input.prop("value", numberWithSpaces(optionsYears.max));
        }

        optionsYears.instance.update({
            from: val
        });
        year = val;
        rangeCalc()
    });

    optionsYears.input.on('focus', function() {
        $(this).val(numberSapceOnly($(this).prop("value")));
        $(this).val(numberWithSpaces($(this).prop("value")));
    })

    optionsYears.input.on('blur', function() {
        if (numberOnly($(this).val()) < optionsYears.min) {
            optionsYears.input.prop("value", numberWithSpaces(optionsYears.min) + ' лет');
            optionsYears.instance.update({
                from: optionsYears.min
            });
            year = optionsYears.min;
            rangeCalc()
        } else {
            optionsYears.input.prop("value", numberWithSpaces(numberOnly($(this).val())) + ' лет');
        }
    })

    optionsYears.instance = optionsYears.range.data("ionRangeSlider");

    // первоначальный взнос

    var optionsInitialFee = {
        min: 500000,
        max: 50000000,
        from: 2500000,
        step: 10000,
        input: $("#rb-initial-fee .calc__input"),
        range: $("#rb-initial-fee .range-bar__input"),
        instance: undefined,
    }

    optionsInitialFee.range.ionRangeSlider({
        grid: false,
        min: optionsInitialFee.min,
        max: optionsInitialFee.max,
        from: optionsInitialFee.from,
        step: optionsInitialFee.step,
        onStart: function (data) {
            initial_fee = data.from;
            optionsInitialFee.input.prop("value", data.from_pretty + ' ₽');
            rangeCalc()
        },
        onChange: function (data) {
            initial_fee = data.from;
            optionsInitialFee.input.prop("value", data.from_pretty + ' ₽');
            rangeCalc()
        },
    });

    optionsInitialFee.input.on("input", function() {
        var val = numberOnly($(this).val());
        $(this).val(numberSapceOnly($(this).prop("value")));
        $(this).val(numberWithSpaces(val));

        if (val < optionsInitialFee.min) {
            val = optionsInitialFee.min;
        } else if (val > optionsInitialFee.max) {
            val = optionsInitialFee.max;
            optionsInitialFee.input.prop("value", numberWithSpaces(optionsInitialFee.max));
        }

        optionsInitialFee.instance.update({
            from: val
        });
        initial_fee = val;
        rangeCalc()
    });

    optionsInitialFee.input.on('focus', function() {
        $(this).val(numberSapceOnly($(this).prop("value")));
        $(this).val(numberWithSpaces($(this).prop("value")));
    })

    optionsInitialFee.input.on('blur', function() {
        if (numberOnly($(this).val()) < optionsInitialFee.min) {
            optionsInitialFee.input.prop("value", numberWithSpaces(optionsInitialFee.min) + ' ₽');
            optionsInitialFee.instance.update({
                from: optionsInitialFee.min
            });
            initial_fee = optionsInitialFee.min;
            rangeCalc()
        } else {
            optionsInitialFee.input.prop("value", numberWithSpaces(numberOnly($(this).val())) + ' ₽');
        }
    })

    optionsInitialFee.instance = optionsInitialFee.range.data("ionRangeSlider");

    // калькулятор

    function rangeCalc() {
        let amountOfCredit = cost - initial_fee
        let sumPerMonth = +((amountOfCredit / (years * 12)) + (amountOfCredit*0.009*30/365)).toFixed(0)
        let opt = { 
            style: 'currency', 
            currency: 'RUB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 1
        }
        if (cost < initial_fee) {
            $(".calc__num").text('Ошибка')
            $(".calc__attention").html('<span>Первоначальный взнос не может быть больше кредита</span><br><br>')
        } else {
            $(".calc__attention").html('')
            $(".calc__num").text(sumPerMonth.toLocaleString('ru-RU', opt))
        }
    }
    
    // прокрутка до элемента
    function toScroll(link) {
        let links = document.querySelectorAll(link)
        links.forEach(element => {
            element.addEventListener('click', function(e) {
                e.preventDefault()
                let href = this.getAttribute('href')
                let block = document.querySelector(`#${href}`)
                let sizeScroll = block.getBoundingClientRect().top + pageYOffset - 50
                window.scrollTo({
                    top: sizeScroll,
                    behavior: "smooth",
                })
            })
        });
    }

    toScroll('a[href="calc"')


    // скрыть/показать список
	function toggleList(items, button, numArr) {
        let num;
		let childs = document.querySelectorAll(items)
		let btn = document.querySelector(button)
        if (mediaQuery) {num = numArr[1]} else {num = numArr[0]}
		
		if (childs.length > num) {
			loopItems(childs, num)
			
			btn.addEventListener('click', function(e) {
				e.preventDefault()
				this.style.display = 'none'
				loopItems(childs, num)
			})
		} else {
			btn.style.display = 'none'
		}
		function loopItems(elements, num) {
			for (let i = num; i < elements.length; i++) {
				elements[i].classList.toggle('hide')
			}
		}
	}

	if (document.querySelector('.services__item')) {
		toggleList(
            '.services .services__item', 
            '.services .services__bottom .btn', 
            [6, 2]
        )
    }
    
	if (document.querySelector('.advantage--full')) {
		toggleList(
            '.advantage--full .advantage__item', 
            '.advantage--full .advantage__bottom .btn', 
            [8, 3]
        )
    }

    
	if (document.querySelector('.advantage--work')) {
		toggleList(
            '.advantage--work .advantage__item', 
            '.advantage--work .advantage__bottom .btn', 
            [8, 3]
        )
    }
    
	if (document.querySelector('.advantage--grid')) {
		toggleList(
            '.advantage--grid .advantage__item', 
            '.advantage--grid .advantage__bottom .btn', 
            [9, 3]
        )
    }
    
    // скрыть/показать вопросы
	$('.faq__question').click(function (e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {
			$('.faq__question').removeClass('active');
			$('.faq__answer').slideUp();
		} else {
			$('.faq__question').removeClass('active');
			$(this).addClass('active');
			$('.faq__answer').slideUp();
			$(this).next().slideDown();
		}
    });
    
    // открыть модалки
    let callModalBtns = document.querySelectorAll('[data-class]');
    let modals = document.querySelectorAll('[data-modal]');

    callModalBtns.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault()
            let events = e;
            openModal(modals, events)
        })
    })

    function openModal(els, e) {
        let events = e;
        modals.forEach(item => {
            item.classList.remove('active')
        });
        let modal;
        if (events == 'notification' || events == 'revmod') {
            modal = els[0]
        } else {
            modal = document.querySelector('[data-modal="' + e.target.dataset.class + '"]')
        }
        modal.style.overflow = 'auto'
        modal.classList.add('active')
        docScrollHide(modal)
        
        if (events == 'notification' || events == 'revmod') {closeModal(events)} else {closeModal(e.target.dataset.class)}
    }

    // закрыть модалки
    function closeModal(closeName) {
        let closeNames = document.querySelectorAll('[data-close="' + closeName + '"]');
        closeNames.forEach(element => {
            element.addEventListener('click', function(e) {
                e.preventDefault()
                let modal = document.querySelector('[data-modal="' + closeName + '"]')
                modal.style.overflow = 'hidden'
                modal.classList.remove('active')
                docScrollShow(modal)
                resetForm(modal)
            })
        })
    }

    // скрыть скролл
    let docBody = document.querySelector('body');
    let scrollWidth = window.innerWidth - docBody.clientWidth;
    function docScrollHide(modal) {
        docBody.style.overflow = 'hidden'
        docBody.style.paddingRight = scrollWidth + 'px'
    }
    // показать скролл
    function docScrollShow(modal) {
        if (document.querySelector('[data-modal]').classList.contains('active')) {
            console.log(true)
        } else {
            console.log(false)
            docBody.style.overflow = 'visible'
            docBody.style.paddingRight = '0'
        }
    }

    // формы

    $('.form__inner').submit(function(){
        var that = $(this);
        var data = that.serialize();
		
		var msgSuccess = '<p>Ваша заявка отправлена!</p>';
		var msgError = '<p>Ошибка! Попробуйте позже</p>';
        $.ajax({
            type: 'post',
            url: '/ajax/form.php',
            data: data,
            dataType: 'json',
            success: function (data) {
                console.log(data);
				alertMessage(msgSuccess);
            },
            error: function(data){
                console.log(false);
				alertMessage(msgError);
            }
        });
        resetForm($(this)[0])
        return false;
    })


    // тест уведомлений
    // let testbtn = document.querySelector('.testbtn')

    // testbtn.addEventListener('click', function(e) {
    //     e.preventDefault()
	// 	var that = this.closest('form');
	// 	var msgSuccess = '<p>Ваша заявка отправлена!</p>';
	// 	var msgError = '<p>Ошибка! Попробуйте позже</p>';
    //     alertMessage(msgSuccess);
    //     resetForm(that)

    // })

    // Сообщение об отправке формы
    let notification = document.querySelectorAll('.notification')
	function alertMessage(msg) {
        let notificationInner = document.querySelector('.notification__text')
        notificationInner.innerHTML = msg;
        openModal(notification, 'notification')
    }

    // отзывы 
    let revmod = document.querySelectorAll('.review-modal')
    let reviewItems = document.querySelectorAll('.review__item')

    let nameOnModal = document.querySelector('.review-modal__name');
    let textOnModal = document.querySelector('.review-modal__text');
    let imgPathOnModal = document.querySelector('.review-modal__img img');
    reviewItems.forEach(element => {
        element.addEventListener('click', function() {
            nameOnModal.textContent = element.querySelector('.review__name').textContent;
            textOnModal.textContent = element.querySelector('.review__text').textContent;
            imgPathOnModal.setAttribute("src", element.querySelector('.review__img img').getAttribute("src"));
            openModal(revmod, 'revmod')
        })
    });

    let faqTabs = document.querySelectorAll('.faq-docs__tabs .faq-docs__tab')
    let faqTabsInner = document.querySelectorAll('.faq-docs__blocks .faq-docs__tab')
    let faqBInners = document.querySelectorAll('.faq-docs__b-inner')
    let faqTitle = document.querySelector('.faq-docs-title')
    let faqBlocks = document.querySelectorAll('.faq-docs__block')

    faqTabs.forEach((element, index) => {
        element.addEventListener('click', function(e) {
            e.preventDefault()
            faqTabs.forEach(item => {
                item.classList.remove('active')
            });
            this.classList.add('active')
            faqTitle.textContent = this.textContent
            faqBlocks.forEach(item => {
                item.classList.remove('active')
            });
            faqBlocks[index].classList.add('active')
        })
    });

    faqTabsInner.forEach((element, index) => {
        element.addEventListener('click', function(e) {
            e.preventDefault()
            faqTabsInner.forEach(item => {
                item.classList.remove('active')
            });
            this.classList.add('active')
            faqTitle.textContent = this.textContent
            faqBInners.forEach(item => {
                item.classList.remove('active')
            });
            faqBInners[index].classList.add('active')
        })
    });
})

function resetForm(form) {
    let input = form.querySelectorAll('input[type="text"], textarea');
    let checkbox = form.querySelectorAll('input[type="checkbox"]');
    let radio = form.querySelectorAll('input[type="radio"]');
    let select = form.querySelectorAll('select');

    input.forEach(element => {
        element.classList.remove('hide')
        element.value = ''
        element.removeAttribute('value')
    })
    checkbox.forEach(element => {
        if (element.hasAttribute('checked')) {
            element.checked = true;
        } else {
            element.checked = false;
        }
    })
    radio.forEach(element => {
        if (element.hasAttribute('checked')) {
            element.checked = true;
        } else {
            element.checked = false;
        }
    })

    select.forEach(element => {
        element.selectedIndex = 0
    })
}