/**
 * A component for loading using SymbolView from expo-symbols on mobile, and images on web.
 *
 */

import { DynamicIcon } from 'lucide-react/dynamic'
import type { IconName } from 'lucide-react/dynamic'
import type { StyleProp, ImageStyle } from 'react-native'

type IconoProps = {
    sfName?: string | null
    DIName?: string | null
    tintColor?: string
    size?: number
    style?: StyleProp<ImageStyle>
}

const Icono: React.FC<IconoProps> = ({ DIName, tintColor, size }) => {
    return (
        <DynamicIcon
            name={DIName as IconName}
            color={tintColor || 'black'}
            size={size || 48}
        />
    )
}

export default Icono
