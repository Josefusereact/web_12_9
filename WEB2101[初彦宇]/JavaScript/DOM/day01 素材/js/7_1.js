function toggle(span) {
    if (span.className == 'open') {
        span.className = 'closed';
        span.nextElementSibling.className = 'hide';
    } else {
        var oldSpan = document.querySelectorAll('.closed');
        for (var i = 0; i < oldSpan.length; i++) {
            if (oldSpan[i] != null) {
                oldSpan[i].className = 'closed';
                oldSpan[i].nextElementSibling.className = 'hide';
            }
        }
        span.className = 'open';
        span.nextElementSibling.className = 'show';
    }

}