import clsx from 'clsx'

type Column<T> = {
  title?: string
  id?: number | string
  accessor?: keyof T
  width?: number
  minWidth?: number
  tdClassName?: string
  thClassName?: string
  render?: (value: any, row: T) => JSX.Element | null
}

type Props<T> = {
  data: T[]
  columns: Column<T>[]
  tableClassName?: string
  theadClassName?: string
  tbodyClassName?: string
  trHeadClassName?: string
  trBodyClassName?: string
  thClassName?: string
  tdClassName?: string
  rowId?: (record: T) => string
}

export const Table: <T>(props: Props<T>) => JSX.Element = (props) => {
  const {
    data,
    columns,
    tableClassName,
    theadClassName,
    tbodyClassName,
    trHeadClassName,
    trBodyClassName,
    thClassName,
    tdClassName,
    rowId,
  } = props

  return (
    <div className={clsx('table !block overflow-auto w-full', tableClassName)}>
      {/* Render header */}
      <div className={clsx('thead inline-block min-w-full', theadClassName)}>
        <div className={clsx('trHead flex', trHeadClassName)}>
          {columns.map((column) => {
            return (
              <div
                key={column.id || (column.accessor as string)}
                className={clsx('th', thClassName, column.thClassName)}
                style={{
                  flex: `1 1 ${column.width || 150}px`,
                  minWidth: column.minWidth || 150,
                }}
              >
                {column.title}
              </div>
            )
          })}
        </div>
      </div>
      <div className={clsx('tbody inline-block min-w-full', tbodyClassName)}>
        {data.map((row, index) => {
          return (
            <div
              key={rowId ? rowId(row) : index}
              className={clsx('trBody flex', trBodyClassName)}
            >
              {columns.map((column) => {
                return (
                  <div
                    key={column.id || (column.accessor as string)}
                    className={clsx('td', tdClassName, column.tdClassName)}
                    style={{
                      flex: `1 1 ${column.width || 150}px`,
                      minWidth: column.minWidth || 150,
                    }}
                  >
                    {column.accessor
                      ? column.render
                        ? column.render(row[column.accessor], row)
                        : row[column.accessor]
                      : null}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
