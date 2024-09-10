document.getElementById('confirmButton').addEventListener('click', confirmPresence);

function confirmPresence() {
    const name = document.getElementById('guestName').value;
    if (name) {
        localStorage.setItem('guestName', name);
        loadPage('info');
    } else {
        alert('Por favor, insira seu nome.');
    }
}

function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('main-container');
            container.innerHTML = `
                <h1>Bem-vindo, ${localStorage.getItem('guestName')}!</h1>
                ${data}
            `;

            const previousStyle = document.getElementById('page-style');
            if (previousStyle) {
                previousStyle.remove();
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.id = 'page-style';
            link.href = `styles/${page}.css`;
            document.head.appendChild(link);


            if (page === 'info') {
                startCountdown();
                document.title = 'Informações da Festa'
                document.getElementById('attentionButton').addEventListener('click', function() {
                    document.getElementById('attentionModal').style.display = 'block';
                });
            
                document.querySelector('.close-attention').addEventListener('click', function() {
                    document.getElementById('attentionModal').style.display = 'none';
                });
            
                window.addEventListener('click', function(event) {
                    const modal = document.getElementById('attentionModal');
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            }

            if (page === 'gallery') {
                document.title = 'Galeria de Fotos'
                generateGallery();
            }

            if (page === 'gifts') {
                document.title = 'Sugestões de Presentes'
            }
        })
        .catch(error => {
            console.error('Erro ao carregar a página:', error);
        });
}


function startCountdown() {
    const eventDate = new Date('2024-10-12T00:00:00').getTime();

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElement.innerHTML = days;
        hoursElement.innerHTML = hours;
        minutesElement.innerHTML = minutes;
        secondsElement.innerHTML = seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            daysElement.innerHTML = "0";
            hoursElement.innerHTML = "0";
            minutesElement.innerHTML = "0";
            secondsElement.innerHTML = "0";
            countdownElement.innerHTML = "A festa começou!";
        }
    }, 1000);
}

function generateGallery() {
    const gallery = document.querySelector('.gallery');
    const numberOfPhotos = 64;
    const photoFormat = '.jpg'; 

    for (let i = 1; i <= numberOfPhotos; i++) {
        const img = document.createElement('img');
        img.src = `${'/assets/carol-imgs/carol'}${i}${photoFormat}`;
        img.alt = `Foto ${i}`;
        img.classList.add('thumbnail')

        img.addEventListener('click', function() {
            showModal(this.src, this.alt);
        });

        gallery.appendChild(img);
    }
}

function showModal(src, alt) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');

    modal.style.display = 'block';
    modalImg.src = src;
    captionText.innerHTML = alt;

    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });
}
