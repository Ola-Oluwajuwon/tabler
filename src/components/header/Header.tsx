import TopNav from './TopNav';
import SubNav from './SubNav';

/**
 * Header — Two-tier header wrapper.
 * Combines TopNav (brand + actions) and SubNav (page navigation).
 */
const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <TopNav />
      <SubNav />
    </header>
  );
};

export default Header;
