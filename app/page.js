'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">QikServe</div>
          <div>
            <Link href="/admin" className="font-medium text-slate-700 hover:text-indigo-600 mr-6">Admin Login</Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Book a Service</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-4">
          Get Your To-Do List Done, <span className="text-indigo-600">Instantly</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
          From plumbing to painting, we connect you with trusted local professionals to handle all your home service needs. Quick, easy, and reliable.
        </p>
        <form className="max-w-xl mx-auto">
          <div className="flex items-center bg-white border border-slate-200 rounded-full shadow-md p-2">
            <input 
              type="text" 
              placeholder="What service do you need? (e.g., 'Electrician')" 
              className="flex-grow p-3 bg-transparent border-none focus:outline-none text-slate-700"
            />
            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Find a Pro
            </button>
          </div>
        </form>
      </main>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mx-auto flex items-center justify-center text-2xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Describe Your Task</h3>
              <p className="text-slate-500">Tell us what you need. It only takes a few minutes.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mx-auto flex items-center justify-center text-2xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
              <p className="text-slate-500">We connect you with the right professional for the job.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mx-auto flex items-center justify-center text-2xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Job Done</h3>
              <p className="text-slate-500">Your chosen pro arrives and completes the task. Pay securely online.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-800 text-white py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} QikServe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
