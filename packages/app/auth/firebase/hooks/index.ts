import { useSyncExternalStore } from 'react'
import { getCurrentUser, onAuthStateChanged } from '@auth/firebase'

export const useFirebaseAuth = () => {
    return useSyncExternalStore(onAuthStateChanged, getCurrentUser, () => null)
}
