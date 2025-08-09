import { makeAutoObservable } from 'mobx'

// TestInfo
export interface TestInfo {
    name: string // 使用者名稱
    age: number // 使用者年齡
    email: string // 電子郵件
    birthDate: Date | null // 使用者生日
}

class TestInfoStore {
    testInfo: TestInfo = {
        name: '',
        age: 0,
        email: '',
        birthDate: null,
    }

    constructor() {
        makeAutoObservable(this)
    }

    // 初始化方法
    initTestInfo() {
        this.testInfo = {
            name: '',
            age: 0,
            email: '',
            birthDate: null,
        }
    }

    // set 整筆
    setTestInfo(data: TestInfo) {
        this.testInfo = data
    }

    // get 整筆
    get getTestInfo() {
        return this.testInfo
    }

    // set 使用者名稱
    setName(name: string) {
        this.testInfo.name = name
    }

    // get 使用者名稱
    get getName() {
        return this.testInfo.name
    }

    // set 使用者年齡
    setAge(age: number) {
        this.testInfo.age = age
    }

    // get 使用者年齡
    get getAge() {
        return this.testInfo.age
    }

    // set 電子郵件
    setEmail(email: string) {
        this.testInfo.email = email
    }

    // get 電子郵件
    get getEmail() {
        return this.testInfo.email
    }

    // set 使用者生日
    setBirthDate(birthDate: Date | null) {
        this.testInfo.birthDate = birthDate
    }

    // get 使用者生日
    get getBirthDate() {
        return this.testInfo.birthDate
    }

}
const testInfoStore = new TestInfoStore()
export default testInfoStore
