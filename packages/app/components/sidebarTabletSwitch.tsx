/**
 * A workaround for the expo-device library not working in next.js 15 with solito monorepo.
 * Maybe more config is needed to make it work.
 */

import { Switch } from 'react-native'

type SidebarTabletSwitchProps = {
    value: boolean
    disabled?: boolean
    onToggle: () => void
}

const SidebarTabletSwitch: React.FC<SidebarTabletSwitchProps> = ({
    value,
    disabled,
    onToggle,
}) => {
    return (
        <Switch
            disabled={disabled ?? false}
            value={value}
            onValueChange={(value) => {
                console.log('onValueChange', value)
                onToggle()
            }}
            onClick={() => {
                console.log('onClick')
                onToggle()
            }}
            onChange={() => {
                console.log('onChange')
                onToggle()
            }}
            style={{
                transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
            }}
        />
    )
}
export default SidebarTabletSwitch
