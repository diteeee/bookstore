import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";

export function Footer() {
    return (
        <div className="border-t">
            <div className="container m-auto py-7 flex items-center">
                <Link href="/">
                <picture>
                    <img className="h-10" src={Logo.src} alt="Logo" />
                </picture>
                </Link>
                <div className="flex-1 flex justify-center">
                    <p className="text-grey">All rights reserved - BookStore.</p>
                </div>
            </div>
        </div>
    );
}
export default Footer;