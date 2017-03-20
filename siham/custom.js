try {
    jQuery("a:contains('" + decodeURIComponent(document.location.search.match(/magicGoto=(.*)/)[1]) + "')")[0].click();
} catch (e) {}

function searchLeaf(selector, innerText) {
    return jQuery(selector).filter(function() {
        return this.children.length === 0 && this.innerText === innerText;
    });
}

function searchLabel(selector, innerText) {
    return searchLeaf(selector, innerText).closest("table").closest("tr");
}
function searchSection(innerText) {
    return searchLeaf(".FORMSECTION_TITLE1 td", innerText).closest("h3").closest("table").closest("tr");
}


searchSection("Personnes à charge").addClass("hideIt");
searchSection("Affectation").addClass("block-Affectation");
searchSection("Avancement d'échelon").addClass("block-Avancement-echelon");
searchSection("Ancienneté").addClass("hideIt");

searchLabel("label", 'Indicateur célibataire géographique').addClass('hideIt hideNextRow');
searchLabel(".block-Affectation label", 'Poste').addClass('hideIt hideNextRow');
searchLabel(".block-Avancement-echelon label", 'Spécialité').addClass('hideIt hideNextRow');
