import { createContext, useContext } from 'react'
import UserInfoStore from './UserInfoStore'

const stores = new UserInfoStore()

const storesContext = createContext(stores)

const useStores = () => useContext(storesContext)

export default useStores
