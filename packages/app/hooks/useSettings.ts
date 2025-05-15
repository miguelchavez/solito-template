import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEYS } from 'app/utils/constants/storage'

const useSettings = async (props: string) => {
    const result = await AsyncStorage.getItem(STORAGE_KEYS[props])
    return result ?? 'system'
}

export default useSettings
