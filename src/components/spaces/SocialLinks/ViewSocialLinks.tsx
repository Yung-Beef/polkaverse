import { MailOutlined } from '@ant-design/icons'
import { isEmptyStr } from '@subsocial/utils'
import { BareProps } from 'src/components/utils/types'
import { NamedLink } from 'src/types'
import { getLinkBrand, getLinkIcon } from './utils'

type SocialLinkProps = BareProps & {
  link: string
  label?: string
}

export const SocialLink = ({ link, label, className }: SocialLinkProps) => {
  if (isEmptyStr(link)) return null

  const brand = getLinkBrand(link)
  return (
    <a
      href={link}
      title={brand}
      rel='noreferrer'
      target='_blank'
      className={`DfBlackLink ${className}`}
    >
      {getLinkIcon(brand)}
      {label && (
        <>
          <span className='ml-2'>{`${label} ${brand}`}</span>
        </>
      )}
    </a>
  )
}

type SocialLinksProps = {
  links: string[] | NamedLink[]
}

export const ViewSocialLinks = ({ links }: SocialLinksProps) => {
  return (
    <>
      {(links as string[]).map((link, i) => (
        <SocialLink key={`social-link-${i}`} link={link} className='mr-3' />
      ))}
    </>
  )
}

type ContactInfoProps = SocialLinksProps & {
  email: string
}

export const EmailLink = ({ link, label, className }: SocialLinkProps) => (
  <a className={`DfBlackLink ${className}`} href={`mailto:${link}`} title='Email'>
    <MailOutlined />
    {label && <span className='ml-2'>{`${label} email`}</span>}
  </a>
)

export const ContactInfo = ({ links, email }: ContactInfoProps) => {
  if (!links && !email) return null

  return (
    <div>
      {links && <ViewSocialLinks links={links} />}
      {email && <EmailLink link={email} />}
    </div>
  )
}
