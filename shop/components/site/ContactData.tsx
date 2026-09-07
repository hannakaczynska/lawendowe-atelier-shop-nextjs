export default function ContactData({}) {
  return (
    <section className="w-full flex-1 max-w-5xl mx-auto py-10 px-4 md:px-6">
      <h1 className="text-2xl md:text-3xl mb-8 font-bold">Kontakt</h1>
      <div className="space-y-8">
        {/* Dane kontaktowe */}
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-medium mb-1 sr-only">Adres</h3>
            <p className="text-[var(--dark-grey)] leading-relaxed">
              Lawendowe Atelje
              <br />
              Stary Grodków
              <br />
              48-320
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-1 sr-only">Email</h3>
            <a
              href="mailto:lawendoweatelier.contact@gmail.com"
              className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition"
            >
              lawendoweatelier.contact@gmail.com
            </a>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-medium mb-1 sr-only">Social media</h3>
              <a
                href="https://www.facebook.com/TWOJ_PROFIL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-[var(--primary-color)] transition underline"
              >
                <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
              </a>

              <a
                href="https://www.instagram.com/TWOJ_PROFIL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--dark-grey)] hover:text-black transition underline"
              >
                <img src="/instagram.svg" alt="Instagram" className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex flex-row md:justify-center gap-6 md:gap-16 mx-auto mt-6 md:mt-18">
            <h3 className="text-lg font-medium mb-1 sr-only">
              Telefon kontaktowy
            </h3>

            <div className="flex flex-col items-center text-center">
              <img
                src="/shop-header.jpg"
                alt="Partner biznesowy"
                className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover mb-3 shadow-sm"
              />
              <p className="font-medium text-sm">Maciek</p>
              <a
                href="tel:+48987654321"
                className="text-[var(--dark-grey)] hover:text-black transition text-sm"
              >
                987 654 321
              </a>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="/shop-header.jpg"
                alt="Hanna"
                className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover mb-3 shadow-sm"
              />
              <p className="font-medium text-sm">Hania</p>
              <a
                href="tel:+48123456789"
                className="text-[var(--dark-grey)] hover:text-black transition text-sm"
              >
                123 456 789
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
