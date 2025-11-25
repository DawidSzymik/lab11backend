import Link from "next/link";
import Image from "next/image";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <header className="bg-blue-900 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition">
            <div className="bg-white rounded-lg p-2 mr-3">
              <Image
                src="/pk-logo.svg"
                alt="Politechnika Krakowska"
                width={40}
                height={40}
              />
            </div>
            <span className="text-xl font-bold text-white">Computer Shop</span>
          </Link>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <NavLink href="/">Home</NavLink>
              </li>
              <li>
                <NavLink href="/about">About</NavLink>
              </li>
              <li>
                <NavLink href="/product-list">Products</NavLink>
              </li>
              <li>
                <NavLink href="/contact">Contact</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}