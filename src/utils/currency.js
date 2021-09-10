import filter from 'lodash/filter'

export const currencies = [
    { name: 'sumCurrency', value: 'sum' },
    { name: 'rubleCurrency', value: 'ruble' },
    { name: 'tengeCurrency', value: 'tenge' },
    { name: 'hryvniaCurrency', value: 'hryvnia' },
    { name: 'belarusian_rubleCurrency', value: 'belarusian_ruble' },
    { name: 'somCurrency', value: 'som' },
    { name: 'somoniCurrency', value: 'somon' },
    { name: 'manatCurrency', value: 'manat' },
    { name: 'afghaniCurrency', value: 'afghan' },
    { name: 'usaDollarCurrency', value: 'usa_dollar' },
]

export function currency(items, name) {
    return filter(items, { value: name })[0].name
}

export const monthPrice = 6.9
