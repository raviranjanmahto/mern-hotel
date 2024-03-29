import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import AddCabin from "./AddCabin";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <AddCabin />
      <Filter
        filterField='discount'
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (low to high)" },
          { value: "regularPrice-desc", label: "Sort by Price (high to low)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (low to high)" },
          {
            value: "maxCapacity-desc",
            label: "Sort by Capacity (high to low)",
          },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
