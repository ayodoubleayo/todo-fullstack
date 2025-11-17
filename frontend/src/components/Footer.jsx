import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t bg-transparent">
      <div className="max-w-3xl mx-auto px-5 text-center text-gray-600 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} Yisa J. Ayo — <span className="font-medium">Full-Stack React Developer</span>
        </p>
        <p className="text-sm mt-1">Portfolio: yisa-portfolio-v2.vercel.app • GitHub: github.com/ayodoubleayo</p>
      </div>
    </footer>
  );
}
