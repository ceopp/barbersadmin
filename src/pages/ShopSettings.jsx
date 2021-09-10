import React, { useContext } from 'react'
import GroupAccessDocumentation from '../components/GroupAccessDocumentation'
import Card from '../components/common/Card'
import UpdateBotName from '../components/UpdateBotName'
import Toggle from '../components/common/Toggle'
import ShopSettingsTabs from '../components/ShopSettingsTabs'
import { ShopContext } from '../components/SidebarShop'


export default function ShopSettings() {
    const { shop, reload } = useContext(ShopContext)

    return (
        <div>
            <ShopSettingsTabs />

            <div className="columns is-mobile">
                <Toggle
                    initialValues={{
                        ...shop,
                        token: shop.bot.token,
                    }}
                    reload={reload}
                    shop={shop}
                    onColor="#7EFF33" />
            </div>

            <div className="columns is-mobile">
                <div className="column">
                    <Card>
                        <UpdateBotName initialValues={{ ...shop, token: shop.bot.token }} />
                    </Card>
                </div>
            </div><br />

            <Card>
                <GroupAccessDocumentation shop={shop} />
            </Card><br />
        </div>
    )
}
