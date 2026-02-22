import { IRoute } from 'umi'

export default function (initialState: any) {
  const { permissions, roles } = initialState

  return {
    routerFilter: (route: IRoute) => {
      return true
    },
    authVerification: (auth: string) => {
      return true
    },
    hasRole: (checkRoles: string[]) => checkRoles.some((role) => roles.includes(role))
  }
}
