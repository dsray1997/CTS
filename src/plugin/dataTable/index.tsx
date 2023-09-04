import React from "react";
import "react-data-grid/lib/styles.css";
import  renderAactionLiink  from './renderers/renderAactionLiink';
import DataGrid, { SelectColumn, textEditor } from "react-data-grid";

export default function DataTable({ columns, rows }: any) {
  const [tableRows, setTableRows] = React.useState<any[]>([]);
  const [tableColumns, setTableColumns] = React.useState<any[]>([]);
  const [selectedRows, setSelectedRows] = React.useState(
    (): ReadonlySet<string> => new Set()
  );
  React.useEffect(() => {
    setTableColumns(columns);
  }, [columns]);

  const getColumns = (columns: any) => {
    const _columns: any = [SelectColumn];
    const tempColumns = columns?.filter((_col: any) => !_col.isHidden);
    tempColumns?.map((_item: any) => {
      _item.key = _item.name;
      //_item.width = `calc(100/${tempColumns.length})`;
      _item.resizable = true;
      _item.renderEditCell = textEditor;
      _item.renderCell= renderAactionLiink;
      _columns.push({ ..._item, name: _item.label });
    });
    return _columns;
  };
  React.useEffect(() => {
    const _rows: any = rows;
    setTableRows([..._rows]);
  }, [rows]);
  function handleFill({ columnKey, sourceRow, targetRow }: any): any {
    return { ...targetRow, [columnKey]: sourceRow[columnKey as keyof any] };
  }
  function handlePaste({
    sourceColumnKey,
    sourceRow,
    targetColumnKey,
    targetRow,
  }: any): any {
    const incompatibleColumns = ["email", "zipCode", "date"];
    if (
      sourceColumnKey === "avatar" ||
      ["id", "avatar"].includes(targetColumnKey) ||
      ((incompatibleColumns.includes(targetColumnKey) ||
        incompatibleColumns.includes(sourceColumnKey)) &&
        sourceColumnKey !== targetColumnKey)
    ) {
      return targetRow;
    }

    return {
      ...targetRow,
      [targetColumnKey]: sourceRow[sourceColumnKey as keyof any],
    };
  }

  function handleCopy({ sourceRow, sourceColumnKey }: any): void {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(sourceRow[sourceColumnKey as keyof any]);
    }
  }
  const rowKeyGetter = (row: any) => {
    return row.id;
  };
  let tableCardHeight = window.innerHeight;
  tableCardHeight -= 250;
  return (
    <div style={{width:'100%'}}>
      <DataGrid
        columns={getColumns(tableColumns)}
        rows={tableRows}
        rowKeyGetter={rowKeyGetter}
        onRowsChange={(value: any) => setTableRows(value)}
        onFill={handleFill}
        onCopy={handleCopy}
        onPaste={handlePaste}
        rowHeight={50}
        className="rdg-light"
        style={{ height: tableCardHeight }}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        onCellClick={(args: any, event: any) => {
          if (args.column.key === "title") {
            event.preventGridDefault();
            args.selectCell(true);
          }
        }}
      />
    </div>
  );
}
