import React, { useEffect } from 'react'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import Layout from '../components/Layout'
import {PROFILE} from '../urls'
import {useGetRequest} from '../hooks/request'
import noAvatar from '../assets/images/no-avatar.png'

export default function User() {
  const profile = useGetRequest({url: PROFILE});

    useEffect(() => {
      profile.request()
    }, [])
    return (
        <Layout>
          {profile.response? (
            <>
              <div className="columns is-mobile">

                <div className="column">
                  <h1 className={cn(css(styles.titleName))}>
                    Информация о пользователе
                  </h1>
                </div>

                {/*<div className="column">
                  <Button
                    text="Редактировать"
                    icon="create-outline"
                    onClick={()=>{}}
                    className="is-link is-outlined is-pulled-right" />
                </div>*/}
              </div>
              <div className="box">
                <div className="columns">
                  <div className="column is-narrow">
                    {profile.response.photo ? (
                      // eslint-disable-next-line react/jsx-no-target-blank
                      <a href={profile.response.photo} target="_blank" className="has-text-black">
                        Фото
                        <img className="image is-128x128" src={profile.response.photo} alt="alt"/>
                      </a>
                    ) : (
                      <img className="image is-128x128" src={noAvatar} alt="alt"/>
                    )}
                  </div>

                  <div className="column">
                    <table className="table is-striped is-fullwidth">
                      <tbody>
                      <tr>
                        <td>Имя:</td>
                        <td><b>{profile.response.name || 'Не задано'}</b></td>
                      </tr>

                      <tr>
                        <td>Телефон:</td>
                        <td>{profile.response.phone}</td>
                      </tr>

                      <tr>
                        <td>Город:</td>
                        <td>{profile.response.city?.name || profile.response.cityName || 'Не задан'}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>

          ) : <></>}
        </Layout>
    )
}

const styles = StyleSheet.create({
    titleName: {
      fontWeight: '500',
      fontSize: '25px'
    },
})
