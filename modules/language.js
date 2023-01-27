// functions to save and retrieve the languages fetched by the song api
// uses local storage so that set languages are saved even when the website is closed

function setLanguagesByArray(language_array) {
    window.localStorage.languages = JSON.stringify(language_array);
}

function getLanguageArray() {
    let json_string = window.localStorage.languages;

    if (json_string == undefined) { return ["hindi", "english"] }

    return JSON.parse(json_string);
}

function getLanguageString() {
    return getLanguageArray().join(",");
}

function addLanguage(language) {
    let lang_arr = getLanguageArray()
    lang_arr.push(language);
    setLanguagesByArray(lang_arr);
}

function removeLanguage(language) {
    let lang_arr = getLanguageArray();

    lang_arr = lang_arr.filter((lang) => lang !== language);

    setLanguagesByArray(lang_arr)
}

export { setLanguagesByArray, getLanguageArray, getLanguageString, addLanguage, removeLanguage }
