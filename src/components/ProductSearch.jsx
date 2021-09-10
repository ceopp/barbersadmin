import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import React, { useCallback, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { useQueryParams } from '../hooks/queryString'
import useTrans from '../hooks/trans'

export default function ProductSearch({ onSearch, ...attributes }) {
    const { search } = useQueryParams()
    const [value, setValue] = useState(search || '')
    const t = useTrans()

    const onChange = useCallback(debounce(({ target }) => {
        onSearch(target.value)
    }, 500), [])

    return (
        <div className="columns column is-mobile">
            <input
                type="search"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={!isEmpty(value)}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value)
                    event.persist()
                    onChange(event, setValue)
                }}
                className={cn('input is-small', css(styles.input))}
                placeholder={`🔎 ${t('search')}...`}
                {...attributes} />&nbsp;
        </div>
    )
}

const styles = StyleSheet.create({
    input: {
        maxWidth: '22rem',
    },
})
