import {stringsModule} from './strings'
const {getStringByLanguage} = stringsModule;

const strings = {
    en: {submit : 'submit'},
    emoji: {submit: '🚀'},
    mermish: {}
}

// remember to always unmock after tests 
describe('language string testting', () => {
    const mockWarn = jest.fn();
    let originalWarn;
    beforeEach(() => {
        originalWarn = console.warn
        console.warn = mockWarn
    })

    afterEach(() => {
        console.warn = originalWarn;
    })

it("returns correct submit string for english", () => {
    const string = getStringByLanguage('en', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).not.toHaveBeenCalled();
})

it("returns the correct submit string emoji", () => {
    const string = getStringByLanguage('emoji', 'submit', strings);
    expect(string).toBe('🚀');
    expect(mockWarn).not.toHaveBeenCalled();
})

it("returns english submit string when language does not exist", () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith("Could not get string [submit] for [notALanguage]");

})

it("returns english submit string when submit key does not exist for language", () => {
    const string = getStringByLanguage('mermish', 'submit', strings);
    expect(string).toBe('submit')
    expect(mockWarn).toHaveBeenCalledWith("Could not get string [submit] for [mermish]");

})

})


// console warn will not be swallowed by previous test suite or permanantly reassigned
test("warn should not be swallowed by jest mock",  () => {
    console.warn('warning!!!')
})

