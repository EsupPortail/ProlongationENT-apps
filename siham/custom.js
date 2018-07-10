try {
    jQuery("a:contains('" + decodeURIComponent(document.location.search.match(/magicGoto=(.*)/)[1]) + "')")[0].click();
} catch (e) {}

function searchLeaf(selector, innerText) {
    return jQuery(selector).filter(function() {
        return this.children.length === 0 && this.innerText === innerText;
    });
}

function searchLeaf_then_table_tr(selector, innerText) {
    return searchLeaf(selector, innerText).closest("table").closest("tr");
}
function searchLeaf_then_fieldset(selector, innerText) {
    return searchLeaf(selector, innerText).closest("fieldset");
}
function searchSection(innerText) {
    return searchLeaf(".FORMSECTION_TITLE1 td", innerText).closest("h3").closest("table").closest("tr");
}
function searchNavigationSection(innerText) {
    return searchLeaf(".gp-navigation-section-header-label", innerText).closest(".gp-navigation-section");
}


searchNavigationSection("Mes compétences").addClass("hideIt");

searchSection("Personnes à charge").addClass("hideIt");
searchSection("Affectation").addClass("block-Affectation");
searchSection("Avancement d'échelon").addClass("block-Avancement-echelon");
searchSection("Ancienneté").addClass("hideIt");

searchLeaf_then_table_tr("label", 'Indicateur célibataire géographique').addClass('hideIt hideNextRow');
searchLeaf_then_table_tr(".block-Affectation label", 'Poste').addClass('hideIt hideNextRow');
searchLeaf_then_table_tr(".block-Avancement-echelon label", 'Spécialité').addClass('hideIt hideNextRow');

searchLeaf_then_fieldset("label", 'Téléphone portable perso').addClass('hideIt hideNextRow');
searchLeaf_then_fieldset("label", 'Téléphone fixe perso').addClass('hideIt hideNextRow');
searchLeaf_then_fieldset("label", 'Téléphone fixe pro principal').addClass('hideIt hideNextRow');
searchLeaf_then_fieldset("label", 'Courrier électronique perso').addClass('hideIt hideNextRow');
searchLeaf_then_fieldset("label", 'Courrier électronique pro').addClass('hideIt hideNextRow');
