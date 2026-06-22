import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels = {
  '': 'Home',
  shop: 'Shop',
  product: 'Product Details',
  cart: 'Cart',
  checkout: 'Checkout',
  wishlist: 'Wishlist',
  login: 'Login',
  register: 'Sign Up',
  profile: 'My Account',
  orders: 'My Orders',
  about: 'About Us',
  contact: 'Contact',
  'order-complete': 'Order Complete',
};

const Breadcrumb = ({ currentLabel, extraCrumbs = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const crumbs = [
    { label: 'Home', path: '/' },
    ...extraCrumbs,
  ];

  pathnames.forEach((segment, index) => {
    const path = '/' + pathnames.slice(0, index + 1).join('/');
    const label = routeLabels[segment] || (currentLabel && index === pathnames.length - 1
      ? currentLabel
      : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '));
    if (label !== 'Home') {
      crumbs.push({ label, path });
    }
  });

  // Deduplicate
  const uniqueCrumbs = crumbs.filter((c, i, arr) => arr.findIndex(x => x.path === c.path) === i);

  if (uniqueCrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center gap-2 text-sm py-4" aria-label="Breadcrumb">
      {uniqueCrumbs.map((crumb, index) => {
        const isLast = index === uniqueCrumbs.length - 1;
        return (
          <div key={crumb.path} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={14} className="text-gray-400" />}
            {isLast ? (
              <span className="text-dark font-medium">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                {index === 0 ? <Home size={14} /> : crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
