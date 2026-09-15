'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PrivateRoute from '@/protectedRoute/ProtectedRoute';
import MainLayout from '@/components/MainLayout';
import { CourseData, Role } from '@/lib/types';
import { createCourse } from '@/lib/services';
import Toast from '@/components/Toast';

export default function CreateCoursePage() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [toastMessage, setToastMessage] = useState<string>('');

  const [courseData, setCourseData] = useState<CourseData>({
      title: "",
      code: "",
      description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
      };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
        e.preventDefault();
        setCreating(true);
        const res = await createCourse(courseData)
        console.log(res)
        setCreating(false);

        if (res.success) {
            setToastType('success');
            setToastMessage(res.message);
       } else if(!res.success){
            setToastType('error');
            setToastMessage(res.message);
       }
       else if(res.statusCode === 400){
            setToastType('error');
            setToastMessage(res.message[0]);
       }

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);

    } catch (error) {
      setToastType('error');
      setToastMessage('Something went wrong!');
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <PrivateRoute allowedRoles={[Role.Teacher]}>
      <MainLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <Link href="/courses" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Courses
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Create Course</h1>
            <p className="text-gray-600 mt-1">Add a new course to the platform</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
              <input
                type="text"
                value={courseData.title}
                onChange={handleChange}
                name="title"   
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Introduction to Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
              <input
                type="text"
                value={courseData.code}
                onChange={handleChange}
                name="code"   
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="CS101"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={courseData.description}
                onChange={handleChange}
                name="description"   
                rows={4}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Course description..."
              />
            </div>
       
             {showToast && (
                    <Toast toastMessage={toastMessage} setShowToast={setShowToast} toastType={toastType} />
                )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={creating}
                className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {creating ? 'Creating...' : 'Create Course'}
              </button>
              <Link
                href="/courses"
                className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </MainLayout>
    </PrivateRoute>
  );
}
