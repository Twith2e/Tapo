export default function SidebarButton({
  icon: Icon,
  text,
  color,
  expanded,
  src,
  id,
}) {
  return (
    <button
      className="flex items-center hover:bg-gray-400 w-full px-3 py-[.7rem] transition-all duration-300"
      title={text}
    >
      <span className="flex-shrink-0">
        {id === 7 ? (
          <div className="rounded-full shadow-md shadow-slate-300">
            <img height={40} width={24} src={src} alt="profile picture" />
          </div>
        ) : (
          <Icon color={color} size={24} />
        )}
      </span>

      <div
        className={`overflow-hidden transition-[width,opacity] duration-300 ${
          expanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0"
        }`}
      >
        <span className={`text-${color} font-sans text-xs text-nowrap`}>
          {text}
        </span>
      </div>
    </button>
  );
}
