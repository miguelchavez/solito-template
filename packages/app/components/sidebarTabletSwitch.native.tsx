/**
 * A workaround for the expo-device library not working in next.js 15 with solito monorepo.
 * Maybe more config is needed to make it work.
 */

import { useState, useEffect } from 'react'
import * as Device from 'expo-device'
import { Switch } from 'react-native'

type SidebarTabletSwitchProps = {
    value: boolean
    onToggle: () => void
}

const SidebarTabletSwitch: React.FC<SidebarTabletSwitchProps> = ({
    value,
    onToggle,
}) => {
    const [isPhone, setIsPhone] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') {
            // It is not a browser, check if the device is an iPhone
            const deviceType = Device.deviceType
            const _isPhone = deviceType == Device.DeviceType.PHONE
            setIsPhone(() => _isPhone)
        }
    }, [])

    return (
        <Switch
            value={value}
            disabled={isPhone}
            onChange={onToggle}
            style={{
                transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
            }}
        />
    )
}

/**
 * onChange={() =>
    setBigIcons((prev) => !prev)
  }
 */

export default SidebarTabletSwitch
