import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-lg w-full mx-4 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-2xl">SP</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          StudyPlatform
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Real-Time Collaborative Study Platform for Students and Teachers
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/login`}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/register`}
            className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
