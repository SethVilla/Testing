import {stringsModule} from './strings'
const {getStringByLanguage} = stringsModule;

const strings = {
    en: {submit : 'submit'},
    emoji: {submit: '🚀'},
    mermish: {}
}

it("returns correct submit string for english", () => {
    const string = getStringByLanguage('en', 'submit', strings);
    expect(string).toBe('submit');
})

it("returns the correct submit string emoji", () => {
    const string = getStringByLanguage('emoji', 'submit', strings);
    expect(string).toBe('🚀');
})

it("returns english submit string when language does not exist", () => {
    const string = getStringByLanguage('notAlanguage', 'submit', strings);
    expect(string).toBe('submit');
})

it("returns english submit string when submit key does not exist for language", () => {
    const string = getStringByLanguage('mermish', 'submit', strings);
    expect(string).toBe('submit')
})

