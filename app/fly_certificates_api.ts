import env from '#start/env'
import FlyApiCaller from './fly_api_caller.js'

export default class FlyCertificatesApi {
  constructor(private readonly apiCaller: FlyApiCaller) {}

  public async addCertificate(appId: string, hostname: string) {
    const addCertificateMutation = `mutation($appId: ID!, $hostname: String!) {
      addCertificate(appId: $appId, hostname: $hostname) {
        errors
        certificate {
					acmeDnsConfigured
					acmeAlpnConfigured
					configured
					certificateAuthority
					createdAt
					dnsProvider
					dnsValidationInstructions
					dnsValidationHostname
					dnsValidationTarget
					hostname
					id
					source
					clientStatus
					isApex
					isWildcard
					issued {
						nodes {
							type
							expiresAt
						}
					}
				}

				check {
					aRecords
					aaaaRecords
					cnameRecords
					soa
					dnsProvider
					dnsVerificationRecord
				  	resolvedAddresses
				}
      }
    }`
    return this.apiCaller.callGraphQLApi({
      query: addCertificateMutation,
      variables: { appId, hostname },
    })
  }

  public async checkCertificate(
    hostname: string
  ): Promise<'unconfigured' | 'pending' | 'configured'> {
    const query = `mutation($input: CheckCertificateInput!) {
			checkCertificate(input: $input) {
				certificate {
					acmeDnsConfigured
					acmeAlpnConfigured
					configured
					certificateAuthority
					createdAt
					dnsProvider
					dnsValidationInstructions
					dnsValidationHostname
					dnsValidationTarget
					hostname
					id
					source
					clientStatus
					isApex
					isWildcard
					issued {
						nodes {
							type
							expiresAt
						}
					}
				}
				check {
					aRecords
			   	aaaaRecords
			   	cnameRecords
			   	soa
		   		dnsProvider
		   		dnsVerificationRecord
				 	resolvedAddresses
			   }
			}
		}
	`

    const response = await this.apiCaller.callGraphQLApi({
      query,
      variables: { input: { appId: 'panache-newsletter', hostname } },
    })
    if (response.checkCertificate.certificate.configured === true) {
      return 'configured'
    }

    // Check records match
    let sharedIpv4Matches = false
    let ipv6Matches = false

    for (const address of response.checkCertificate.check.resolvedAddresses) {
      if (address === env.get('FLY_IPV4')) {
        sharedIpv4Matches = true
      }
      if (address === env.get('FLY_IPV6')) {
        ipv6Matches = true
      }
    }

    const isCorrectlyConfigured = sharedIpv4Matches && ipv6Matches

    return isCorrectlyConfigured ? 'pending' : 'unconfigured'
  }

  public async removeCertificate(appId: string, hostname: string) {
    const query = `
  		mutation($appId: ID!, $hostname: String!) {
  			deleteCertificate(appId: $appId, hostname: $hostname) {
  				app {
  					name
  				}
  				certificate {
  					hostname
  					id
  				}
  			}
  		}
  	`

    return this.apiCaller.callGraphQLApi({
      query,
      variables: { appId, hostname },
    })
  }
}
