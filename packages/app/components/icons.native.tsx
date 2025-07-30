/**
 * A component for loading using SymbolView from expo-symbols on mobile, and images on web.
 *
 */

import { SymbolView, SFSymbol } from 'expo-symbols'
import type { StyleProp, ViewStyle } from 'react-native'

type IconoProps = {
    sfName?: SFSymbol
    DIName?: string | null
    tintColor?: string
    size?: number
    style?: StyleProp<ViewStyle>
}

const Icono: React.FC<IconoProps> = ({ size, sfName, tintColor, style }) => {
    return (
        <SymbolView
            size={size || 18}
            name={sfName || 'ellipsis'}
            tintColor={tintColor || '#ddd'}
            style={style}
        />
    )
}

export default Icono
