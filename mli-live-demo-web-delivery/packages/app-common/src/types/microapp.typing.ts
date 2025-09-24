import Keycloak from 'keycloak-js'

export type MicroAppProps = {
  keycloakRef: Keycloak
  [key: string]: any
}
