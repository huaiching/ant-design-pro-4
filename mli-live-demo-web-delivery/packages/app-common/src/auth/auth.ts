class Auth {
  permissions: Set<string>
  roles: string[]
  static instance: any

  constructor() {
    this.permissions = new Set<string>()
    this.roles = []
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Auth()
    }
    return this.instance
  }
}

export default Auth.getInstance()
