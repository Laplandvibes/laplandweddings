import { Link, NavLink, type LinkProps, type NavLinkProps } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';

/**
 * Drop-in replacement for `<Link>` that prefixes internal paths with `/fi`
 * automatically when the current language is Finnish. External URLs and
 * non-string `to` values pass through untouched.
 */
export default function L({ to, ...rest }: LinkProps) {
  const { localePath } = useLang();
  if (typeof to === 'string' && to.startsWith('/') && !to.startsWith('//')) {
    return <Link to={localePath(to)} {...rest} />;
  }
  return <Link to={to} {...rest} />;
}

/** NavLink variant with the same /fi-prefix behaviour. */
export function NL({ to, ...rest }: NavLinkProps) {
  const { localePath } = useLang();
  if (typeof to === 'string' && to.startsWith('/') && !to.startsWith('//')) {
    return <NavLink to={localePath(to)} {...rest} />;
  }
  return <NavLink to={to} {...rest} />;
}
