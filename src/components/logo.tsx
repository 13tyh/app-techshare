import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="text-2xl font-bold">
        Tech<span className="text-blue-600">Share</span>
      </h1>
    </Link>
  );
};

export default Logo;
