import React from "react";
const titles = ["Dr.", "Mr.", "Mrs.", "Miss", "Ms."] as const;

type Action = {
  row: any;
  onRowChange: (data: any, isChanged: boolean) => void;
};
const renderDropdown: React.FC<Action> = ({ row, onRowChange }) => {
  return (
    <select
      className={"hi"}
      value={row.title}
      onChange={(event: any) =>
        onRowChange({ ...row, title: event.target.value }, true)
      }
    >
      {titles.map((title) => (
        <option key={title} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
};
export default renderDropdown;
