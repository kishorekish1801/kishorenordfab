import Link from "next/link";
export default function NotFound(){return <div className="page-content empty-state"><h1>Page not found</h1><p>The page you're looking for isn't available.</p><Link href="/" className="button button-primary">Back to Home</Link></div>}
