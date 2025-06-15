// pages/ssr/[id].tsx

import { GetServerSideProps } from "next";
import Link from "next/link";

interface News {
  _id: string;
  title: string;
  body: string;
}

interface NewsDetailProps {
  news: News | null;
}

export default function NewsDetail({ news }: NewsDetailProps) {
  if (!news) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">News not found</h1>
        <Link href="/news">
          <a className="text-blue-500 underline">Back to News List</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-serif font-extrabold mb-6">{news.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">{news.body || "No description available."}</p>

      <div className="mt-10">
        <Link href="/news">
          <a className="text-blue-500 hover:underline">← Back to News List</a>
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const res = await fetch(`${process.env.API_URL}/api/news/${id}`);
    if (res.status === 404) {
      return { props: { news: null } };
    }
    const news: News = await res.json();

    return {
      props: { news },
    };
  } catch (error) {
    return { props: { news: null } };
  }
};
