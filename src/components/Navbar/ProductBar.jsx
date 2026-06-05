import DropdownMenu from "./DropdownMenu";

export default function ProductBar({
  parentCategories = [],
  childCategories= [],
  collections = []
}) {

  return (

    <div className="hidden md:flex lg:flex flex-wrap pl-20 bg-blue-500 transition-all">

      {parentCategories.map((parent, index) => (

        <DropdownMenu
          key={index}
          title={parent.name}
          items={childCategories.filter(child => child?.parentCategory === parent._id)}
          titleLink={`/Jewellery/category/${parent.slug}`}
          itemsLink="/Jewellery/category"
          
        />

      ))}

      <DropdownMenu title="Collections" items={collections} titleLink={`/Collections`}
      />

    </div>

  );
}