'use client'

import Link from "next/link";

export interface BreadcrumbItem {
    label: string;
    path?: string;
    state?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    onClick?: Function;
}

export default function Breadcrumb(props: BreadcrumbProps){
    return (
        <nav className="font-bold text-lg max-md:text-md">
            <ol className="list-none p-0 inline-flex">
                {props.items?.map((item, index) => (
                    <li key={index} className={"flex items-center "}>
                        {item.path ? (
                            <Link
                                href={item.path}
                                className={"hover:text-blue-500 "+ ((index == 0) ? "text-black": "text-gray-500")}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <button
                                onClick={() => props.onClick?.(item.state)}
                                className={"hover:text-blue-500 focus:outline-none "+ ((index == 0) ? "text-black": "text-gray-500")}
                            >
                                {item.label}
                            </button>
                        )}
                        {index < props.items?.length - 1 && (
                            <span className="mx-2 text-gray-500 font-medium">{'>'}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
