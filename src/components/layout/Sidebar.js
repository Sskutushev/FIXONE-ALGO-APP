import React from 'react';
import { NavLink } from 'react-router-dom';

// Placeholder Icons - will be replaced with proper SVG components
const FeedIcon = () => <span role="img" aria-label="feed">📰</span>;
const MarketplaceIcon = () => <span role="img" aria-label="marketplace">🛒</span>;
const ChartIcon = () => <span role="img" aria-label="chart">📈</span>;
const DesktopIcon = () => <span role="img" aria-label="desktop">💻</span>;
const FavoritesIcon = () => <span role="img" aria-label="favorites">⭐</span>;
const SupportIcon = () => <span role="img" aria-label="support">💬</span>;
const HelpIcon = () => <span role="img" aria-label="help">❓</span>;


const NavItem = ({ to, icon, children }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-base font-semibold ` +
            (isActive ? 'bg-main text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100 hover:text-black')
        }
    >
        {icon}
        <span className="flex-1">{children}</span>
    </NavLink>
);

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-xl flex-shrink-0 flex-col p-6 hidden lg:flex">
      <nav className="flex flex-col gap-2">
        {/* Block 1 */}
        <div className="flex flex-col gap-2">
            <NavItem to="/dashboard/feed" icon={<FeedIcon />}>Лента</NavItem>
            <NavItem to="/dashboard/marketplace" icon={<MarketplaceIcon />}>Маркетплейс</NavItem>
            <NavItem to="/dashboard/chart" icon={<ChartIcon />}>График</NavItem>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Block 2 */}
        <div className="flex flex-col gap-2">
            <NavItem to="/dashboard/desktop" icon={<DesktopIcon />}>Рабочий стол</NavItem>
            <NavItem to="/dashboard/favorites" icon={<FavoritesIcon />}>Избранное</NavItem>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Block 3 */}
        <div className="flex flex-col gap-2">
            <NavItem to="/dashboard/support" icon={<SupportIcon />}>Поддержка</NavItem>
            <NavItem to="/dashboard/help" icon={<HelpIcon />}>Помощь</NavItem>
        </div>
      </nav>
      <div className="mt-auto">
        {/* Footer content for sidebar can go here */}
      </div>
    </aside>
  );
};

export default Sidebar;
