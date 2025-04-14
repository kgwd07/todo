export default function Footer() {
    return (
      <footer className="bg-white py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} TodoApp. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }