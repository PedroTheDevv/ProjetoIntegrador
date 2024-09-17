document.querySelector('.menu').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

document.querySelector('.drop').addEventListener('click', function() {
    document.querySelector('.drop ul').classList.toggle('active');
});