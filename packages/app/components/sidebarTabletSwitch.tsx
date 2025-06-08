/**
 * A workaround for the expo-device library not working in next.js 15 with solito monorepo.
 * Maybe more config is needed to make it work.
 */

import { Switch } from 'react-native'

type SidebarTabletSwitchProps = {
    value: boolean
    onToggle: () => void
}

const SidebarTabletSwitch: React.FC<SidebarTabletSwitchProps> = ({
    value,
    onToggle,
}) => {
    return (
        <Switch
            value={value}
            disabled={true}
            style={{
                transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
            }}
        />
    )
}
export default SidebarTabletSwitch
