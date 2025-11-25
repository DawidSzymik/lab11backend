import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {currentYear} Computer Shop - Autor: [Twoje Imię i Nazwisko]
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Aktualna data: {currentDate}
            </p>
          </div>
          
          <div>
            <Link 
              href="https://pk.edu.pl" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition text-sm"
            >
              Politechnika Krakowska im. Tadeusza Kościuszki
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}