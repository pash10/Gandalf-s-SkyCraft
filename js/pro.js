document.addEventListener('DOMContentLoaded', function(event) {
    var flipButton = document.getElementById('flipButton');
    var flipCard = document.getElementById('flip-card-toggle');
    
    flipButton.addEventListener('click', function() {
        flipCard.classList.toggle('do-flip');
    });
});
