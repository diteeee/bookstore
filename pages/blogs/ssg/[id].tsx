import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

interface Book {
  title: string;
  description?: string | { value: string };
  subjects?: string[];
  covers?: number[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  if (!id) {
    return { notFound: true };
  }

  const res = await fetch(`https://openlibrary.org/works/${id}.json`);
  if (!res.ok) {
    return { notFound: true };
  }

  const book: Book = await res.json();

  return {
    props: { book, id },
    revalidate: 3600,
  };
};

export default function BookPage({ book, id }: { book: Book; id: string }) {
  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "No description available.";

  const coverId = book.covers?.[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-cream-100 to-sage-200 py-16 px-6 flex justify-center">
      <div className="max-w-5xl bg-white rounded-xl shadow-lg p-10 flex flex-col md:flex-row gap-8">
        {/* Book Cover */}
        <div className="flex-shrink-0 w-64 h-96 rounded-lg overflow-hidden shadow-md border border-gray-200 relative">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={book.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="256px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Cover Available
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="flex flex-col flex-grow">
          <h1 className="text-4xl font-serif font-bold text-teal-800 mb-4">
            {book.title}
          </h1>

          <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
            {description}
          </p>

          {book.subjects && book.subjects.length > 0 && (
            <div className="mt-4">
              <h3 className="text-teal-600 font-semibold mb-2">Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {book.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="bg-teal-100 text-teal-800 px-3 py-1 text-sm rounded-full shadow-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 italic text-center">
              Rendered at build time (SSG).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
