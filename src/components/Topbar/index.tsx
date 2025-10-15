"use client";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton,
} from "@nextui-org/react";
import { Bell, LogIn, Mail, Search, User, ChevronDown } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Bank {
  id: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  createdAt: string;
}

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Fetch banks on component mount
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("/api/banks");
        if (response.ok) {
          const data = await response.json();
          setBanks(data);
        }
      } catch (error) {
        console.error("Failed to fetch banks:", error);
      } finally {
        setLoadingBanks(false);
      }
    };

    fetchBanks();
  }, []);

  const navigationItems = [
    { key: "dashboard", label: "Dashboard", href: "/dashboard" },
    { key: "database", label: "Database", href: "/dashboard/database" },
    { key: "banks", label: "Banks", href: "/dashboard/banks" },
    { key: "team", label: "Team", href: "/team" },
    { key: "documents", label: "Documents", href: "/documents" },
  ];

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  const getPlaceholderImage = () => {
    const placeholders = [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    ];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  };

  const getUserInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const renderNavigationItem = (item: typeof navigationItems[0]) => {
    // Special handling for Banks navigation item
    if (item.key === "banks" && banks.length > 0 && !loadingBanks) {
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant={isActiveRoute(item.href) ? "flat" : "light"}
              color={isActiveRoute(item.href) ? "success" : "default"}
              className={`px-4 py-2 h-auto min-w-0 text-sm font-medium transition-all duration-300 ${
                isActiveRoute(item.href)
                  ? "bg-gradient-to-r from-blue-50 to-blue-50 text-blue-700 shadow-sm border border-blue-200/50"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50/50"
              }`}
              endContent={<ChevronDown className="w-3.5 h-3.5" />}
            >
              {item.label}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Banks"
            className="p-2"
            itemClasses={{
              base: "rounded-lg px-3 py-2 transition-colors",
            }}
          >
            <DropdownItem
              key="all-banks"
              className="font-medium"
              onPress={() => handleNavClick(item.href)}
            >
              View All Banks
            </DropdownItem>
            <>
              {banks.map((bank) => (
                <DropdownItem
                  key={bank.id}
                  description={`Account: ${bank.accountNumber}`}
                  onPress={() => handleNavClick(`${item.href}/${bank.id}`)}
                >
                  {bank.bankName}
                </DropdownItem>
              ))}
            </>
          </DropdownMenu>
        </Dropdown>
      );
    }

    // Default button for other navigation items
    return (
      <Button
        variant={isActiveRoute(item.href) ? "flat" : "light"}
        color={isActiveRoute(item.href) ? "success" : "default"}
        className={`px-4 py-2 h-auto min-w-0 text-sm font-medium transition-all duration-300 ${
          isActiveRoute(item.href)
            ? "bg-gradient-to-r from-blue-50 to-blue-50 text-blue-700 shadow-sm border border-blue-200/50"
            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50/50"
        }`}
        onPress={() => handleNavClick(item.href)}
      >
        {item.label}
      </Button>
    );
  };

  const renderMobileNavigationItem = (item: typeof navigationItems[0]) => {
    // Special handling for Banks navigation item on mobile
    if (item.key === "banks" && banks.length > 0 && !loadingBanks) {
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant={isActiveRoute(item.href) ? "flat" : "light"}
              color={isActiveRoute(item.href) ? "success" : "default"}
              className={`w-full justify-start px-4 py-3 h-auto text-base font-medium ${
                isActiveRoute(item.href)
                  ? "bg-gradient-to-r from-blue-50 to-blue-50 text-blue-700"
                  : "text-zinc-700"
              }`}
              endContent={<ChevronDown className="w-4 h-4" />}
            >
              {item.label}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Banks"
            className="p-2"
            itemClasses={{
              base: "rounded-lg px-3 py-2 transition-colors",
            }}
          >
            <>
              <DropdownItem
                key="all-banks"
                className="font-medium"
                onPress={() => {
                  handleNavClick(item.href);
                  setIsMenuOpen(false);
                }}
              >
                View All Banks
              </DropdownItem>
              {banks.map((bank) => (
                <DropdownItem
                  key={bank.id}
                  description={`Account: ${bank.accountNumber}`}
                  onPress={() => {
                    handleNavClick(`${item.href}/${bank.id}`);
                    setIsMenuOpen(false);
                  }}
                >
                  {bank.bankName}
                </DropdownItem>
              ))}
            </>
          </DropdownMenu>
        </Dropdown>
      );
    }

    // Default button for other navigation items on mobile
    return (
      <Button
        variant={isActiveRoute(item.href) ? "flat" : "light"}
        color={isActiveRoute(item.href) ? "success" : "default"}
        className={`w-full justify-start px-4 py-3 h-auto text-base font-medium ${
          isActiveRoute(item.href)
            ? "bg-gradient-to-r from-blue-50 to-blue-50 text-blue-700"
            : "text-zinc-700"
        }`}
        onPress={() => {
          handleNavClick(item.href);
          setIsMenuOpen(false);
        }}
      >
        {item.label}
      </Button>
    );
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/80 backdrop-blur-xl border-b border-zinc-200/50 shadow-sm"
      maxWidth="full"
      height="72px"
    >
      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Brand/Logo */}
      <NavbarContent className="sm:flex gap-8" justify="start">
        <NavbarBrand className="flex items-center gap-2">
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
                <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
                <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
                <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
              </div>
            </div>
          </div>
        </NavbarBrand>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => (
            <NavbarItem key={item.key}>
              {renderNavigationItem(item)}
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* Right side actions */}
      <NavbarContent justify="end" className="gap-3">
        {/* Search */}
        <NavbarItem className="hidden sm:flex">
          <Input
            placeholder="Search..."
            startContent={<Search className="w-4 h-4 text-zinc-400" />}
            className="w-64"
            classNames={{
              base: "max-w-full",
              mainWrapper: "h-full",
              input: "text-sm placeholder:text-zinc-400",
              inputWrapper:
                "h-10 bg-zinc-50/50 hover:bg-zinc-100/50 group-data-[focused=true]:bg-white border border-zinc-200/50 group-data-[focused=true]:border-blue-300",
            }}
          />
        </NavbarItem>

        {/* Notifications */}
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            className="text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100/50"
          >
            <Badge content="3" color="danger" size="sm" className="text-xs">
              <Bell className="w-5 h-5" />
            </Badge>
          </Button>
        </NavbarItem>

        {/* Messages */}
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            className="text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100/50"
          >
            <Badge content="2" color="primary" size="sm" className="text-xs">
              <Mail className="w-5 h-5" />
            </Badge>
          </Button>
        </NavbarItem>

        {/* User Menu or Sign In */}
        <NavbarItem>
          {status === "loading" ? (
            <Skeleton className="w-8 h-8 rounded-full" />
          ) : session?.user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  size="sm"
                  className="transition-transform hover:scale-105 cursor-pointer ring-2 ring-transparent hover:ring-blue-200"
                  src={session.user.image || getPlaceholderImage()}
                  name={session.user.name || "User"}
                  showFallback
                  fallback={
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-semibold text-xs">
                      {getUserInitials(session.user.name || session.user.email)}
                    </div>
                  }
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                className="p-2"
                itemClasses={{
                  base: "rounded-lg px-3 py-2 transition-colors",
                }}
              >
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-medium text-sm">
                    {session.user.name || "User"}
                  </p>
                  <p className="text-xs text-zinc-500">{session.user.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="profile-page"
                  startContent={<User className="w-4 h-4" />}
                >
                  My Profile
                </DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
                <DropdownItem key="help">Help & Support</DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<LogIn className="w-4 h-4 rotate-180" />}
                  onPress={handleSignOut}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              color="primary"
              variant="flat"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium"
              startContent={<LogIn className="w-4 h-4" />}
              onPress={() => signIn()}
            >
              Sign In
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="bg-white/95 backdrop-blur-xl pt-6">
        {navigationItems.map((item) => (
          <NavbarMenuItem key={item.key}>
            {renderMobileNavigationItem(item)}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default TopBar;