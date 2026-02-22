import { useUserGlobalContext } from '../store/useUserContext'

const Component = () => {
    const { user } = useUserGlobalContext()
    return (
        <>
            <h2>姓名：{user.name}</h2>
            <h2>年齡：{user.age}歲</h2>
            <h2>性別：{user.gender}</h2>
        </>
    )
}
export default Component
