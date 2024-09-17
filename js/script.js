document.addEventListener('DOMContentLoaded', function() {
    const linkToForm = document.querySelectorAll('.header__link-tel.to-form, .header__link');
    linkToForm.forEach(element => {
        element.addEventListener('click', function() {
            if (window.innerWidth <= 780 ) {
                headerOpened();
            }
        });
    });        
    function headerOpened(){
        headerMenu.classList.toggle('active');
        burger.classList.toggle('active');
        if (headerMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }
    const body = document.querySelector('.body');
    const burger = document.querySelector('.header__burger');
    const headerMenu = document.querySelector('.header');
    burger.addEventListener('click', function() {
        headerOpened()
    });
    window.addEventListener('load', checkScreenWidth);
    window.addEventListener('resize', checkScreenWidth);
    function checkScreenWidth() {
        if (window.innerWidth > 940) {
            document.body.style.overflow = '';
            headerMenu.classList.remove('active');
            burger.classList.remove('active');
        }
    }
    let formName = document.getElementById('name');
    let formPhone = document.getElementById('phone');
    let formTenderLink = document.getElementById('tenderLink');
    let formEdrpou = document.getElementById('edrpou');
    const form = document.querySelector('.feedback__form');
    let isTimerActive = false;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let name = formName.value;
        let phone = formPhone.value;
        let tenderLink = formTenderLink.value;
        let edrpou = formEdrpou.value;
        let checkbox = document.querySelector('.feedback__checkbox');
        let isError = false
        const phoneRegex = /^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

        if(name === ''){
            formName.classList.add('error');
            isError = true
        }
        
        if (phone === '' || !phone.match(phoneRegex)) {
            formPhone.classList.add('error');
            isError = true
        }
        if (tenderLink.trim() !== '' && !isValidUrl(tenderLink)) {
            formTenderLink.classList.add('error');
            isError = true;
        }
        if (formEdrpou.value !== '' && formEdrpou.value.length !== 8) {
            formEdrpou.classList.add('error');
            isError = true;
        }
        if(isError){
            showErrorMessage();
            return;
        }
        if (!checkbox.checked) {
            isTimerActive = true;
            const statusElement = document.querySelector('.feedback__status');
            statusElement.classList.add('checkbox');
            setTimeout(() => {
                statusElement.classList.remove('checkbox');
                isTimerActive = false;
            }, 3000);
            return;
        }
        let formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('tender_link', tenderLink);
        formData.append('edrpou', edrpou);
        fetch('send.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            showSuccessMessage()

            form.reset();
        })
        .catch(error => {
            showSuccessMessage()
            console.error('Error:', error);
        });
    });
    function showErrorMessage() {
        if (!isTimerActive) {
            isTimerActive = true;
            const statusElement = document.querySelector('.feedback__status');
            statusElement.classList.add('error');
            setTimeout(() => {
                statusElement.classList.remove('error');
                isTimerActive = false;
            }, 3000);
        }
    }
    
    function showSuccessMessage() {
        isTimerActive = true;
        const statusElement = document.querySelector('.feedback__status');
        statusElement.classList.add('send');
        setTimeout(() => {
            statusElement.classList.remove('send');
            isTimerActive = false;
        }, 3000);

    }
    function isValidUrl(url) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(url) || /^[^ "]+\.[^ "]+$/.test(url);
    }
    const formElements = [formName, formPhone, tenderLink, formEdrpou];
    formElements.forEach(element => {
        element.addEventListener('change', () => reset(element));
        element.addEventListener('keyup', () => reset(element));
    });
    const reset = (element) => {
        element.classList.remove("error");
    };

    formName.addEventListener('keydown', (event) => {
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
        if (event.key) {
          const isAllowedKey = allowedKeys.includes(event.key);
          const isLetter = event.key.match(/[a-zA-Zа-яА-Я]/);
      
          if (!isAllowedKey && !isLetter) {
            event.preventDefault();
          }
        }
    });
      

    formPhone.addEventListener('focus', () => {
        const maskOptions = {
            mask: '+{38}(000)000-00-00',
            lazy: false
        };
        const mask = IMask(formPhone, maskOptions);
    });
    document.getElementById('edrpou').addEventListener('input', function() {
        const maxLength = 8;
        const inputValue = this.value.replace(/\D/g, '');
        const truncatedValue = inputValue.slice(0, maxLength);
      
        if (inputValue !== truncatedValue) {
          this.value = truncatedValue;
        }
    });
    document.getElementById('edrpou').addEventListener('keydown', (event) => {
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
        const isAllowedKey = allowedKeys.includes(event.key);
        const isDigit = event.key.match(/[0-9]/);

        if (!isAllowedKey && !isDigit) {
            event.preventDefault();
        }
    });
    let swiper = new Swiper('.services-swiper', {
        spaceBetween: 0,
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            601: {
                spaceBetween: 20,
                slidesPerView: 2,
            },
            860: {
                spaceBetween: 20,
                slidesPerView: 3,
            },
            900: {
                spaceBetween: 48,
                slidesPerView: 3,
            },
        },
    });
    checkHeaderScroll()
    function checkHeaderScroll(){
        let header = document.querySelector('.header');
        if (window.scrollY > 10) {
          header.classList.add('scroll');
        } else {
          header.classList.remove('scroll');
        }
    }
    window.addEventListener('scroll', function() {
        checkHeaderScroll()
    });
});
