/**
 * Vertex Tech IO Footer – matches approved design
 * Dark background, social row, address, copyright, phone, scroll-to-top
 */
const ExternalArrowSvg = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden>
    <rect x="5.06641" y="19.2783" width="20.5712" height="2.61221" transform="rotate(-40.2798 5.06641 19.2783)" fill="white" />
    <rect x="7.97144" y="6.54443" width="2.61221" height="2.61221" transform="rotate(-40.2798 7.97144 6.54443)" fill="white" />
    <rect x="11.6528" y="6.84814" width="2.61221" height="2.61221" transform="rotate(-40.2798 11.6528 6.84814)" fill="white" />
    <rect x="15.3345" y="7.15186" width="2.61221" height="2.61221" transform="rotate(-40.2798 15.3345 7.15186)" fill="white" />
    <rect x="18.7124" y="11.1372" width="2.61221" height="2.61221" transform="rotate(-40.2798 18.7124 11.1372)" fill="white" />
    <rect x="18.4089" y="14.8198" width="2.61221" height="2.61221" transform="rotate(-40.2798 18.4089 14.8198)" fill="white" />
    <rect x="18.1045" y="18.501" width="2.61221" height="2.61221" transform="rotate(-40.2798 18.1045 18.501)" fill="white" />
  </svg>
);

const socialLinks = [
  { name: "FACEBOOK", href: "https://www.facebook.com/share/1F2kNRMFUr/?mibextid=wwXIfr", iconClass: "fa-brands fa-facebook" },
  { name: "WHATSAPP", href: "https://wa.me/17637229401", iconClass: "fa-brands fa-whatsapp" },
  { name: "LINKEDIN", href: "https://www.linkedin.com/company/vertex-techio/?viewAsMember=true", iconClass: "fa-brands fa-linkedin" },
  { name: "INSTAGRAM", href: "https://www.instagram.com/vertextech.io/", iconClass: "fa-brands fa-instagram" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0c14] text-white" role="contentinfo">
      {/* Social row */}
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 px-4 py-5 md:py-5 transition-colors hover:text-[#00ff97] group"
          >
            <span className="flex items-center gap-2">
              <i className={`${link.iconClass} text-xl`} aria-hidden />
              <span className="font-semibold text-sm uppercase tracking-wide">{link.name}</span>
            </span>
            <ExternalArrowSvg />
          </a>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 border-t border-white/20 min-h-[91px]">
        <div className="flex items-center gap-2 px-4 py-4 md:py-0 md:min-h-[91px]">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 flex-shrink-0" aria-hidden>
            <path d="M21.4791 8.80192C20.3854 3.98942 16.1875 1.82275 12.5 1.82275C12.5 1.82275 12.5 1.82275 12.4896 1.82275C8.81248 1.82275 4.60414 3.979 3.51039 8.7915C2.29164 14.1665 5.58331 18.7186 8.56248 21.5832C9.66664 22.6457 11.0833 23.1769 12.5 23.1769C13.9166 23.1769 15.3333 22.6457 16.4271 21.5832C19.4062 18.7186 22.6979 14.1769 21.4791 8.80192ZM12.5 14.0207C10.6875 14.0207 9.21873 12.5519 9.21873 10.7394C9.21873 8.92692 10.6875 7.45817 12.5 7.45817C14.3125 7.45817 15.7812 8.92692 15.7812 10.7394C15.7812 12.5519 14.3125 14.0207 12.5 14.0207Z" fill="#00FF97" />
          </svg>
          <span className="font-bold text-sm md:text-base lg:text-lg">30 N GOULD ST, STE R, SHERIDAN, WY, 82801</span>
        </div>
        <div className="flex items-center justify-center px-4 py-4 md:py-0 md:min-h-[91px] text-center">
          <p className="font-medium text-sm md:text-base m-0">
            Copyright © 2025{" "}
            <a href="/" className="text-white hover:underline">
              Vertex Tech Io
            </a>
            , All rights reserved.
          </p>
        </div>
        <div className="flex items-center justify-end md:justify-center gap-3 px-4 py-4 md:py-0 md:min-h-[91px] flex-wrap">
          <a href="tel:+17637229401" className="inline-flex items-center gap-2 text-white hover:text-[#00ff97] transition-colors" aria-label="Call us">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden>
              <path d="M18.3541 11.1976C17.9062 11.1976 17.552 10.833 17.552 10.3955C17.552 10.0101 17.1666 9.20801 16.5208 8.51009C15.8853 7.83301 15.1874 7.43717 14.6041 7.43717C14.1562 7.43717 13.802 7.07259 13.802 6.63509C13.802 6.19759 14.1666 5.83301 14.6041 5.83301C15.6458 5.83301 16.7395 6.39551 17.6978 7.40593C18.5937 8.35384 19.1666 9.53093 19.1666 10.3851C19.1666 10.833 18.802 11.1976 18.3541 11.1976Z" fill="#00FF97" />
              <path d="M22.1146 11.1981C21.6667 11.1981 21.3125 10.8335 21.3125 10.396C21.3125 6.69808 18.3021 3.69808 14.6146 3.69808C14.1667 3.69808 13.8125 3.3335 13.8125 2.896C13.8125 2.4585 14.1667 2.0835 14.6042 2.0835C19.1875 2.0835 22.9167 5.81266 22.9167 10.396C22.9167 10.8335 22.5521 11.1981 22.1146 11.1981Z" fill="#00FF97" />
              <path d="M12.2812 14.8022L8.87492 18.2085C8.49992 17.8752 8.13533 17.5314 7.78117 17.1772C6.70825 16.0939 5.7395 14.9585 4.87492 13.771C4.02075 12.5835 3.33325 11.396 2.83325 10.2189C2.33325 9.03141 2.08325 7.896 2.08325 6.81266C2.08325 6.10433 2.20825 5.42725 2.45825 4.80225C2.70825 4.16683 3.10409 3.5835 3.65617 3.06266C4.32284 2.40641 5.052 2.0835 5.82284 2.0835C6.1145 2.0835 6.40617 2.146 6.66659 2.271C6.93742 2.396 7.177 2.5835 7.3645 2.85433L9.78117 6.26058C9.96867 6.521 10.1041 6.76058 10.1978 6.98975C10.2916 7.2085 10.3437 7.42725 10.3437 7.62516C10.3437 7.87516 10.2708 8.12516 10.1249 8.36475C9.9895 8.60433 9.79158 8.85433 9.54158 9.10433L8.74992 9.92725C8.63533 10.0418 8.58325 10.1772 8.58325 10.3439C8.58325 10.4272 8.59367 10.5002 8.6145 10.5835C8.64575 10.6668 8.677 10.7293 8.69784 10.7918C8.88534 11.1356 9.20825 11.5835 9.66658 12.1252C10.1353 12.6668 10.6353 13.2189 11.177 13.771C11.552 14.1356 11.9166 14.4897 12.2812 14.8022Z" fill="#00FF97" />
              <path d="M22.8854 19.0937C22.8854 19.3854 22.8333 19.6875 22.7292 19.9792C22.6979 20.0625 22.6667 20.1458 22.625 20.2292C22.4479 20.6042 22.2188 20.9583 21.9167 21.2917C21.4063 21.8542 20.8438 22.2604 20.2083 22.5208C20.1979 22.5208 20.1875 22.5312 20.1771 22.5312C19.5625 22.7812 18.8958 22.9167 18.1771 22.9167C17.1146 22.9167 15.9792 22.6667 14.7812 22.1563C13.5833 21.6458 12.3854 20.9583 11.1979 20.0938C10.7917 19.7917 10.3854 19.4896 10 19.1667L13.4062 15.7604C13.6979 15.9792 13.9583 16.1458 14.1771 16.2604C14.2292 16.2812 14.2917 16.3125 14.3646 16.3437C14.4479 16.375 14.5312 16.3854 14.625 16.3854C14.8021 16.3854 14.9375 16.3229 15.0521 16.2083L15.8438 15.4271C16.1042 15.1667 16.3542 14.9688 16.5938 14.8438C16.8333 14.6979 17.0729 14.625 17.3333 14.625C17.5312 14.625 17.7396 14.6667 17.9688 14.7604C18.1979 14.8542 18.4375 14.9896 18.6979 15.1667L22.1458 17.6146C22.4167 17.8021 22.6042 18.0208 22.7188 18.2812C22.8229 18.5417 22.8854 18.8021 22.8854 19.0937Z" fill="#00FF97" />
            </svg>
            <span className="font-bold">+1(763)-722-9401</span>
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center justify-center w-11 h-11 bg-[#00ff97] text-[#0a0c14] shrink-0 hover:opacity-90 transition-opacity"
            aria-label="Scroll to top"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
