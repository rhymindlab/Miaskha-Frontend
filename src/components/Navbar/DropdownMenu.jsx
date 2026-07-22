export default function DropdownMenu({
  title,
  items = [],
  titleLink = "/",
  itemsLink = "/"
}) {

  return (

    <div className="relative group  ">

      <a href={titleLink}><button
        className="
          px-5
          py-4
          hover:bg-blue-950
          hover:text-white
          transition-all
        "
      >
        {title}
      </button></a>

      <div
        className="
          text-sm
          w-[200px]
          flex
          absolute
          top-full
          left-0
          opacity-0
          invisible
          group-hover:opacity-100
          group-hover:visible
          transition-all
          duration-300
          bg-white
          shadow-xl
          p-4
          w-56
          z-50
        "
      >
        <div className="flex-1">
          <span>Popular {title} Types</span>
          

        {items.map((item, index) => (

          <a
            key={index}
            href= {`/${itemsLink.replace(/^\/+/, "")}${item.slug}`}
            className="
              block
              py-2
              hover:text-blue-600
            "
          >
            {item.name}
          </a>

        ))}
        </div>
        {/* <div className="flex-1">Price Range</div>
        <div className="flex-1">By Metals & Stones</div>
        <div className="flex-1">Explore Our Collections</div> */}

      </div>

    </div>

  );
}