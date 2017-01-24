import {act} from 'enso'
import I from 'immutable'
import {getJSON} from 'app/_lib/request'
import countries from 'world-countries'
import languages from 'app/_lib/languages'

// TODO: Convert to ISO 639-3
const codeAliases = {
  'fil': 'fil',
  'zh_cn': 'zho',
  'zh_tw': 'zho'
}

export function fetchLocales (version) {
  return getJSON(`https://api.github.com/repos/date-fns/date-fns/contents/src/locale?ref=v${version}`)
    .then(locales => locales.filter(({type, name}) => type === 'dir' && name !== '_lib'))
    .then(locales => locales.reduce((acc, locale) => {
      let code = codeAliases[locale.name]
      let lang
      if (code) {
        lang = languages.find(lang => lang.id === code)
      } else {
        lang = languages.find(lang => lang.part1 === locale.name)
        if (lang) code = lang.id
      }

      if (code) {
        return acc.concat({
          // Part ISO 639-1 to ISO 639-3
          code,
          url: locale.html_url,
          name: lang.refName
        })
      } else {
        return acc
      }
    }, []))
    .then(locales => locales.map(locale => Object.assign({}, locale, {
      countries: countries.reduce((acc, country) => {
        if (Object.keys(country.languages).includes(locale.code)) {
          // ISO 3166-1 alpha-2
          return acc.concat(country.cca2)
        } else {
          return acc
        }
      }, [])
    })))
    .then(locales => act(state => state.setIn(['locales', version], I.fromJS(locales))))
    .catch(reason => act(state => state.set('locales', Object.assign(new Error('Failed to fetch locales'), {reason}))))
}
