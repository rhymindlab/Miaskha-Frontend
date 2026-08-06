import { Construction, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Development() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-100 px-6">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
          <Construction className="w-12 h-12 text-yellow-600" />
        </div>

        <h1 className="mt-8 text-4xl font-bold text-neutral-900">
          Page Under Development
        </h1>

        <p className="mt-4 text-neutral-600 leading-relaxed">
          We're working hard to bring you this feature. Please check back
          soon—we're building something amazing!
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-5 py-2 text-sm font-medium text-neutral-700">
          <Clock className="w-4 h-4" />
          Coming Soon
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-white font-medium transition hover:bg-neutral-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}