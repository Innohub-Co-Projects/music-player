// scroll button events
sections.forEach(section => {
    let left_button = section.querySelector('#left_scroll');
    let right_button = section.querySelector('#right_scroll');
    let list = section.querySelector('.list_container');

    left_button.addEventListener('click', () =>{
        list.scrollLeft -= 330;
    })
    right_button.addEventListener('click', () =>{
        list.scrollLeft += 330;
    })
})
