'use client';

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-black border-t border-slate-800 overflow-hidden">

            {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-700/10 blur-[120px]" />
      </div> */}

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <h2 className="font-tektur text-xl font-bold text-white mb-3">
                            Idea<span className="text-fuchsia-500">tion</span>
                        </h2>
                        {/* <p className="text-slate-400 text-sm leading-relaxed">
              Discover curated project ideas to sharpen your skills across any
              tech stack — from beginner to cracked.
            </p> */}
                        <p className="text-slate-500 text-xs font-tektur">
                            © {new Date().getFullYear()} DumbTempest. All rights reserved.
                        </p>
                    </div>

                  
                    <div>
                        <h3 className="font-tektur text-sm uppercase tracking-wider text-slate-300 mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li>
                                <Link href="/privacy" className="hover:text-white transition">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-tektur text-sm uppercase tracking-wider text-slate-300 mb-4">
                            Connect
                        </h3>

                        <div className="flex gap-4 flex-wrap">
                            <a
                                href="https://github.com"
                                target="_blank"
                                className="px-4 py-2 -skew-x-12 border border-slate-700 text-slate-300 text-sm font-tektur  hover:border-purple-500 hover:border-2 hover:text-white transition"
                            >
                                <span className="block skew-x-12">GitHub</span>
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                className="px-4 py-2 -skew-x-12 border border-slate-700 text-slate-300 text-sm font-tektur hover:border-2 hover:border-purple-500 hover:text-white transition"
                            >
                                <span className="block skew-x-12">LinkedIn</span>
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                className="px-4 py-2 -skew-x-12 border border-slate-700 text-slate-300 text-sm font-tektur hover:border-2 hover:border-purple-500 hover:text-white transition"
                            >
                                <span className="block skew-x-12">Twitter</span>
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </footer>
    );
}
