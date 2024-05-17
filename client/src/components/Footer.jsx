import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white shadow dark:bg-neutral-800 ">
      <div className="w-full p-4 md:py-8">
        <div className="flex items-center justify-center">
          <a href="" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img className="logo w-[2rem] mr-4 mx-auto" src="/pink_logo.png" alt="" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/kontakt" className="hover:underline me-4 md:me-6">
                Footer
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
