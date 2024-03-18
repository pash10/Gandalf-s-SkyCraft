document.addEventListener('DOMContentLoaded', function(event) {
    var flipCard = document.querySelector('.flip-card');
    var flipToBackBtn = document.getElementById('flip-card-btn-turn-to-back');
    var flipToFrontBtn = document.getElementById('flip-card-btn-turn-to-front');
    
    flipToBackBtn.onclick = function() {
        console.log('Flip to Back');
        flipCard.classList.add('do-flip');
    };

    flipToFrontBtn.onclick = function() {
        console.log('Flip to Front');
        flipCard.classList.remove('do-flip');
    };
});


