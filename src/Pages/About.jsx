import React from 'react';
import { Calendar, User, Play } from 'lucide-react';

export default function NewsPage() {
  // All dynamic content centralized here
  const newsData = {
    breadcrumb: ['Home', 'About', 'News'],
    header: {
      title: 'Latest News',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    featured: {
      id: 'dQw4w9WgXcQ',
      title: '11TH AINET INTERNATIONAL CONFERENCE',
      author: {
        name: 'Jane Cooper',
        org: 'abc xyz',
      },
      date: '17th Jan, 2025',
      content: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        'It has survived not only five centuries...',
        'It was popularised in the 1960s...',
        'And more recently with desktop publishing software...',
      ],
    },

    additionalNews: [
      {
        id: 'dQw4w9WgXcQ',
        title: '"Tech creating rift among teachers"',
        description:
          'Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who arent. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday.',
      },
      {
        id: 'dQw4w9WgXcQ',
        title: '"Tech creating rift among teachers"',
        description:
          'Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who arent. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday.',
      },
    ],
    loadMoreText: 'Load More News',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            {newsData.breadcrumb.map((crumb, index) => (
              <span key={index}>
                <span className={`${index === newsData.breadcrumb.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-blue-600 cursor-pointer'}`}>
                  {crumb}
                </span>
                {index < newsData.breadcrumb.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{newsData.header.title}</h1>
          <p className="text-gray-600 leading-relaxed">{newsData.header.description}</p>
        </div>

        {/* Featured Video */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-video relative">
              <iframe
                src={`https://www.youtube.com/embed/${newsData.featured.id}`}
                title={newsData.featured.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{newsData.featured.title}</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{newsData.featured.author.name}</p>
                    <p className="text-xs text-gray-500">{newsData.featured.author.org}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{newsData.featured.date}</span>
                </div>
              </div>
              <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                {newsData.featured.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Additional News Cards */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest News</h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

          {newsData.additionalNews.map((news, index) => (

            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">

              <div className="aspect-video relative">
                <iframe
                  src={`https://www.youtube.com/embed/${news.id}`}
                  title={news.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-2xl my-3">{news.title}</h3>
                <p className="text-lg text-lg leading-relaxed">{news.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
