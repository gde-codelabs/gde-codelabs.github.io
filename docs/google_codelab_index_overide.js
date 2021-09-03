const cards = document.querySelectorAll('.card');

cards.forEach(myFunction);

function myFunction(card, index, array) {
    const category = card.getAttribute('category');

    if (category != "") {
        const footer = card.querySelectorAll('.card-footer')[0];
        const footer_a = footer.querySelectorAll('a')[0]

        var logo_span = document.createElement("span");
        logo_span.className = category + "-icon";
        footer.insertBefore(logo_span, footer_a);

        const sub_category = card.getAttribute('subcategory');

        if (sub_category != "") {
            logo_span = document.createElement("span");
            logo_span.className = sub_category + "-icon";
            footer.insertBefore(logo_span, footer_a);      
        }
    }
}
