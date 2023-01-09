// creates a new element with given parameters
function newElement(type_str, attributes_obj, textContent = '') {
    let element = document.createElement(type_str);
    element.textContent = textContent;

    for (const [attr, value] of Object.entries(attributes_obj)) {
        element.setAttribute(attr, value);
    }
    return element;
}

function createCardInfoElement(title_text, subtitle_text) {
    let info = newElement('div', { class: 'card_info' })
    let title = newElement('h5', { class: 'card_title' }, title_text)
    let subtitle = newElement('div', { class: 'card_subtitle' }, subtitle_text)

    info.appendChild(title)
    info.appendChild(subtitle)
    return info
}

function createContentCard(title, subtitle, img_src) {
    let card = newElement('li', { class: 'content_card' })
    let img = newElement('img', { src: img_src })
    let card_info = createCardInfoElement(title, subtitle)

    card.appendChild(img)
    card.appendChild(card_info)
    return card
}

let sections = document.querySelectorAll('.section_container')

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
