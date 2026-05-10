export default function Navlinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex text-neutral-500 text-body ${className}`}>
      <li>
        <a href="#beranda">Beranda</a>
      </li>
      <li>
        <a href="#cara-kerja">Cara Kerja</a>
      </li>
      <li>
        <a href="#tentang-aplikasi">Tentang Aplikasi</a>
      </li>
    </ul>
  );
}
